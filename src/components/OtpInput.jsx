import React, { useState, useRef, useEffect } from 'react';

export default function OTPInput({ length = 6, onChange, className }) {
  const [values, setValues] = useState(() => Array(length).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    onChange(values.join(''));
  }, [values, onChange]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;       
    const next = [...values];
    next[idx] = val;
    setValues(next);
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !values[idx] && idx > 0) {
      // if empty and backspace, move to previous
      inputsRef.current[idx - 1].focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
    if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim().slice(0, length);
    if (!/^\d+$/.test(paste)) return;
    const next = Array(length).fill('');
    paste.split('').forEach((ch, i) => { next[i] = ch; });
    setValues(next);
    // focus the last pasted character (or last box)
    const lastIndex = Math.min(paste.length - 1, length - 1);
    inputsRef.current[lastIndex].focus();
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {values.map((val, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={e => handleChange(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          ref={el => inputsRef.current[idx] = el}
          className={className}
        />
      ))}
    </div>
  );
}
