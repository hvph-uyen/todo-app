import { useState, useEffect } from 'react';
import { formatDate } from '../utils/helpers';

function Calendar({ tasks, selectedDate, onSelectDate, theme }) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  useEffect(() => {
    if (selectedDate) setCurrentMonth(new Date(selectedDate));
  }, [selectedDate]);

  const start = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const startDay = start.getDay();
  const totalCells = 42;
  const monthDays = [];
  for (let i = 0; i < totalCells; i++) {
    const offset = i - startDay + 1;
    monthDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), offset));
  }

  const hasTasksToShow = date =>
    tasks.some(t => t.date === formatDate(date) && !t.completed);

  const isToday = date => formatDate(date) === formatDate(new Date());
  const isSelected = date => (selectedDate ? formatDate(date) === selectedDate : false);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    onSelectDate(null);
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    onSelectDate(null);
  };

  return (
    <div style={{ ...theme.card }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          userSelect: "none",
          color: theme.page.color
        }}
      >
        <button onClick={prevMonth} aria-label="previous month" style={theme.ghostBtn}>
          &lsaquo;
        </button>

        <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}
        </div>

        <button onClick={nextMonth} aria-label="next month" style={theme.ghostBtn}>
          &rsaquo;
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
          textAlign: "center",
          fontSize: 12,
          color: theme.fontColorSecondary,
          fontWeight: 700,
          userSelect: "none"
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}

        {monthDays.map((date, i) => {
          const fmt = formatDate(date);
          const today = isToday(date);
          const selected = isSelected(date);
          const has = hasTasksToShow(date);
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          return (
            <button
              key={i}
              onClick={() => isCurrentMonth && onSelectDate(selected ? null : fmt)}
              disabled={!isCurrentMonth}
              aria-current={today ? "date" : undefined}
              aria-selected={selected}
              style={{
                padding: 10,
                borderRadius: 12,
                border: selected
                  ? `2px solid ${theme.btn.background}`
                  : "1px solid transparent",
                background: selected ? theme.suggestBox.background : "transparent",
                color: isCurrentMonth ? (today ? theme.btn.background : theme.page.color) : "#777",
                cursor: isCurrentMonth ? "pointer" : "default",
                position: "relative",
                fontWeight: today ? 700 : 400,
                fontSize: 14
              }}
              title={fmt}
            >
              {date.getDate()}
              {has && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 12,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: theme.btn.background
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;