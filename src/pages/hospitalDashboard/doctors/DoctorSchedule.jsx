import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopDivider from '@/components/TopDivider';
import DoctorProfileSidebar from '@/components/DoctorProfileSidebar';


// Set up localizer
const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const doctorData = {
  name: 'Dr Grace Bello',
  specialty: 'OB-GYN',
  phone: '+234810081728',
  email: 'Hazelnutt@gmail.com',
  licenseNo: '0123456789',
};

const DoctorSchedule = () => {
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 24)); // July 24, 2025

  const rawEvents = [
    { date: 3, title: 'Caseload 1', color: 'purple' },
    { date: 16, title: 'Case load 2', color: 'pink' },
    { date: 22, title: 'Case load 3', color: 'orange' },
    { date: 25, title: 'Caseload 4', color: 'purple' },
  ];

  // Convert to BigCalendar format
  const events = rawEvents.map((e) => ({
    title: e.title,
    start: new Date(2025, 6, e.date),
    end: new Date(2025, 6, e.date),
    allDay: true,
    color: e.color,
  }));

  const handleNavigate = (action) => {
    const newDate = new Date(currentDate);
    if (action === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (action === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (action === 'today') {
      return setCurrentDate(new Date());
    }
    setCurrentDate(newDate);
  };

  const getMonthYearString = () => {
    return format(currentDate, 'MMMM yyyy');
  };

  const eventPropGetter = (event) => {
    const colorMap = {
      purple: 'bg-purple-200 border-l-purple-500 text-purple-700',
      pink: 'bg-pink-200 border-l-pink-500 text-pink-700',
      orange: 'bg-orange-200 border-l-orange-500 text-orange-700',
    };
    const colorClass = colorMap[event.color] || 'bg-gray-200';
    return {
      className: `!rounded !px-2 !py-1 !text-sm !font-medium !border-l-4 ${colorClass}`,
    };
  };

  return (
    <div>
      <TopDivider />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex max-w-7xl mx-auto">
          <DoctorProfileSidebar doctor={doctorData} />

          <div className="flex-1 bg-white rounded-r-lg p-6 shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleNavigate('today')}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Today
                </button>
              </div>

              <div className="flex items-center space-x-2 justify-between">
                  <button
                    onClick={() => handleNavigate('prev')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                    {getMonthYearString()}
                  </h2>
                  <button
                    onClick={() => handleNavigate('next')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

              <div className="flex bg-gray-100 rounded-lg p-1">
                {['day', 'week', 'month'].map((v) => (
                  <button
                    key={v}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                      view === v
                        ? v === 'month'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setView(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* React Big Calendar */}
            <div className="h-[600px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={Views.MONTH}
                view={view}
                onView={(v) => setView(v)}
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                eventPropGetter={eventPropGetter}
                toolbar={false}
                className="custom-calendar bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
