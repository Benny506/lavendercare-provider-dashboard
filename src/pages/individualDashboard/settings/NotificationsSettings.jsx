import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TopDivider from '@/components/TopDivider';

const NotificationsSettings = () => {
  const [settings, setSettings] = useState({
    newBookingRequests: { enabled: false, method: 'SMS' },
    upcomingSessionReminders: { enabled: true, method: 'SMS' },
    newScreeningSubmissions: { enabled: true, method: 'SMS' },
    highRiskScreeningAlerts: { enabled: true, method: 'SMS' }
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const setMethod = (key, method) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], method }
    }));
  };

  return (
    <div>
      <TopDivider />

      <p className='text-xl font-bold p-3'>Notifications</p>
      <div className="min-h-screen w-full p-3">
        <div className="bg-white rounded-lg w-full">
          <div className="p-4 max-w-4xl">
            {/* New Booking Requests */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">New Booking Requests</h3>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.newBookingRequests.enabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  onClick={() => toggleSetting('newBookingRequests')}
                >
                  <div className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.newBookingRequests.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="newBooking"
                      checked={settings.newBookingRequests.method === 'SMS'}
                      onChange={() => setMethod('newBookingRequests', 'SMS')}
                      className="mr-2"
                    />
                    <Icon icon="material-symbols:sms" className="w-4 h-4 mr-1" />
                    <span className="text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="newBooking"
                      checked={settings.newBookingRequests.method === 'Email'}
                      onChange={() => setMethod('newBookingRequests', 'Email')}
                      className="mr-2"
                    />
                    <Icon icon="material-symbols:mail" className="w-4 h-4 mr-1" />
                    <span className="text-gray-700">Email</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Upcoming Session Reminders */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Session Reminders</h3>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.upcomingSessionReminders.enabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  onClick={() => toggleSetting('upcomingSessionReminders')}
                >
                  <div className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.upcomingSessionReminders.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sessionReminders"
                      checked={settings.upcomingSessionReminders.method === 'SMS'}
                      onChange={() => setMethod('upcomingSessionReminders', 'SMS')}
                      className="mr-2"
                    />
                    <Icon icon="material-symbols:sms" className="w-4 h-4 mr-1" />
                    <span className="text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sessionReminders"
                      checked={settings.upcomingSessionReminders.method === 'Email'}
                      onChange={() => setMethod('upcomingSessionReminders', 'Email')}
                      className="mr-2"
                    />
                    <Icon icon="material-symbols:mail" className="w-4 h-4 mr-1" />
                    <span className="text-gray-700">Email</span>
                  </label>
                </div>
              </div>
            </div>

            {/* New Screening Submissions */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">New Screening Submissions (MH only)</h3>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.newScreeningSubmissions.enabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  onClick={() => toggleSetting('newScreeningSubmissions')}
                >
                  <div className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.newScreeningSubmissions.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="screeningSubmissions"
                      checked={settings.newScreeningSubmissions.method === 'SMS'}
                      onChange={() => setMethod('newScreeningSubmissions', 'SMS')}
                      className="mr-2"
                    />
                    <Icon icon="material-symbols:sms" className="w-4 h-4 mr-1" />
                    <span className="text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="screeningSubmissions"
                      checked={settings.newScreeningSubmissions.method === 'Email'}
                      onChange={() => setMethod('newScreeningSubmissions', 'Email')}
                      className="mr-2"
                    />
                    <Icon icon="material-symbols:mail" className="w-4 h-4 mr-1" />
                    <span className="text-gray-700">Email</span>
                  </label>
                </div>
              </div>
            </div>

            {/* High-Risk Screening Alerts */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">High-Risk Screening Alerts</h3>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.highRiskScreeningAlerts.enabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  onClick={() => toggleSetting('highRiskScreeningAlerts')}
                >
                  <div className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.highRiskScreeningAlerts.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="highRiskAlerts"
                      checked={settings.highRiskScreeningAlerts.method === 'SMS'}
                      onChange={() => setMethod('highRiskScreeningAlerts', 'SMS')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="highRiskAlerts"
                      checked={settings.highRiskScreeningAlerts.method === 'Email'}
                      onChange={() => setMethod('highRiskScreeningAlerts', 'Email')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Email</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;