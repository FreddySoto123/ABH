import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionHeader from './SectionHeader';
import './DynamicCalendar.css';

const DynamicCalendar = ({ title }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // --- CAMBIO CLAVE 1: Array con nombres completos y abreviaturas ---
  const weekdays = [
    { full: 'Lunes', short: 'Lu' },
    { full: 'Martes', short: 'Ma' },
    { full: 'Miércoles', short: 'Mi' },
    { full: 'Jueves', short: 'Ju' },
    { full: 'Viernes', short: 'Vi' },
    { full: 'Sábado', short: 'Sá' },
    { full: 'Domingo', short: 'Do' },
  ];

  return (
    <section className="dynamic-calendar-section">
      <SectionHeader title={title} centerTitle={true} />
      
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} className="nav-button">
            <FiChevronLeft size={24} />
          </button>
          <h2>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h2>
          <button onClick={nextMonth} className="nav-button">
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* --- CAMBIO CLAVE 2: Renderizamos ambos nombres con diferentes clases --- */}
        <div className="calendar-weekdays">
          {weekdays.map(day => (
            <div key={day.full}>
              <span className="weekday-full">{day.full}</span>
              <span className="weekday-short">{day.short}</span>
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => {
            const dayClasses = [
              'calendar-day',
              !isSameMonth(day, monthStart) && 'is-other-month',
              isToday(day) && 'is-today'
            ].filter(Boolean).join(' ');

            return (
              <div key={index} className={dayClasses}>
                <span>{format(day, 'd')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicCalendar;