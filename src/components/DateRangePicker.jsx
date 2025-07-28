import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

// DatePicker component: handles custom date selection
const DatePicker = ({ startDate, endDate, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {new Date(startDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })} –{' '}
          {new Date(endDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </button>

      {showPicker && (
        <div className="absolute top-full mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="flex gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">From</label>
              <input
                type="date"
                value={startDate}
                onChange={e => onDateChange('start', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">To</label>
              <input
                type="date"
                value={endDate}
                onChange={e => onDateChange('end', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowPicker(false)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// PresetDropdown component: handles quick range selection
const PresetDropdown = ({ selectedPreset, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const presets = [
    { label: 'Last 7 days', offset: 7 },
    { label: 'Last 30 days', offset: 30 },
    { label: 'Last 90 days', offset: 90 },
    {
      label: 'This month',
      custom: now => ({ start: new Date(now.getFullYear(), now.getMonth(), 1), end: new Date(now.getFullYear(), now.getMonth() + 1, 0) }),
    },
    {
      label: 'Last month',
      custom: now => ({ start: new Date(now.getFullYear(), now.getMonth() - 1, 1), end: new Date(now.getFullYear(), now.getMonth(), 0) }),
    },
    {
      label: 'This year',
      custom: now => ({ start: new Date(now.getFullYear(), 0, 1), end: new Date(now.getFullYear(), 11, 31) }),
    },
  ];

  const handleSelect = preset => {
    let range;
    const now = new Date();
    if (preset.offset) {
      const end = new Date(now);
      const start = new Date(now);
      start.setDate(end.getDate() - preset.offset);
      range = { start, end };
    } else {
      range = preset.custom(now);
    }
    onSelect(range.start.toISOString().split('T')[0], range.end.toISOString().split('T')[0], preset.label);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-sm font-medium text-gray-700">{selectedPreset}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {showDropdown && (
        <div className="absolute top-full mt-2 py-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-full">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSelect(p)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main wrapper: holds state and renders subcomponents
const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setDate(now.getDate() - 30);
    return now.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedPreset, setSelectedPreset] = useState('Last 30 days');

  const handleDateChange = (type, value) => {
    if (type === 'start') setStartDate(value);
    else setEndDate(value);
    setSelectedPreset('Custom range');
  };

  const handlePresetSelect = (start, end, label) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedPreset(label);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg">
      <DatePicker startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
      <PresetDropdown selectedPreset={selectedPreset} onSelect={handlePresetSelect} />
    </div>
  );
};

export default DateRangePicker;
