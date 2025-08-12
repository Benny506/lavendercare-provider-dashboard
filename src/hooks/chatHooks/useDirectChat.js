import supabase from '../../database/dbInit';
import { useEffect, useRef, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useDirectChat({ topic, meId, peerId }) {

  const channelRef = useRef(null);
  const realtimeSubRef = useRef(null);

  const [status, setStatus] = useState('connecting');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const sendMessage = useCallback(
    async ({ text, toUser, bookingId }) => {
      if (!text?.trim()) return;

      const tempId = uuidv4();
      const optimisticMessage = {
        id: tempId,
        from_user: meId,
        to_user: toUser,
        message: text.trim(),
        created_at: new Date().toISOString(),
        delivered_at: null,
        read_at: null,
        pending: true,
        failed: false,
      };

      // Optimistic UI update
      setMessages((prev) => [...prev, optimisticMessage]);

      let attempts = 0;
      const maxAttempts = 2;
      let inserted = false;

      while (attempts < maxAttempts && !inserted) {
        attempts++;
        const { error } = await supabase.from('bookings_chats').insert([
          {
            id: tempId,
            from_user: meId,
            to_user: toUser,
            message: optimisticMessage.message,
            created_at: optimisticMessage.created_at,
            delivered_at: null,
            read_at: null,
            booking_id: bookingId,
          },
        ]);
        if (!error) inserted = true;
        console.log("ERROR ON COUNT", attempts, error)
      }

      if (!inserted) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, pending: false, failed: true } : msg
          )
        );
      }
    },
    [meId, topic]
  );

  useEffect(() => {
    if (!topic || !meId) return;

    setStatus('connecting');

    // Presence channel setup remains the same
    const channel = supabase.channel(topic, {
      config: { broadcast: { self: true, ack: true }, presence: { key: meId, user: { id: meId } } },
    });

    // Presence event handlers (join, leave, sync) unchanged
    channel.on('presence', { event: 'sync' }, () => {
      const presenceState = channel.presenceState();
      const users = Object.keys(presenceState).map((key) => ({
        key,
        user: presenceState[key][0]?.user || null,
      }));
      setOnlineUsers(users);
    });
    channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
      setOnlineUsers((prev) => {
        if (prev.find((u) => u.key === key)) return prev;
        return [...prev, { key, user: newPresences[0]?.user || null }];
      });
    });
    channel.on('presence', { event: 'leave' }, ({ key }) => {
      setOnlineUsers((prev) => prev.filter((u) => u.key !== key));
    });

    channel.subscribe(async (subStatus) => {
      if (subStatus === 'SUBSCRIBED') {
        setStatus('subscribed');
        await channel.track({ online_at: new Date().toISOString() });
      } else if (subStatus === 'CLOSED' || subStatus === 'CHANNEL_ERROR') {
        setStatus('error');
      }
    });

    channelRef.current = channel;

    // NEXT: Work on this!
    const realtimeSubscription = supabase.channel('realtime-bookings-chats')
    
    realtimeSubscription.on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings_chats',          
          filter: `or(and(from_user.eq.${meId},to_user.eq.${peerId}),and(from_user.eq.${peerId},to_user.eq.${meId}))`        
        },
        (payload) => {
          const newMsg = payload.new;
          console.log(payload)
          setMessages((prev) => {
            const idx = prev.findIndex((msg) => msg.id === newMsg.id);
            if (idx !== -1) {
              // Replace optimistic message
              const updated = [...prev];
              updated[idx] = { ...newMsg, pending: false, failed: false };
              return updated;
            }
            return [...prev, { ...newMsg, pending: false, failed: false }];
          });
        }
      )


    realtimeSubscription.subscribe(status => {
      console.log("REAL-TIME subscription status", status)
    });

    realtimeSubRef.current = realtimeSubscription;

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(realtimeSubscription);
      channelRef.current = null;
      realtimeSubRef.current = null;
      setMessages([]);
      setOnlineUsers([]);
    };
  }, [topic, meId]);

  return {
    sendMessage,
    messages,
    status,
    onlineUsers,
  };
}
