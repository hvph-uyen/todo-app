import { useState, useEffect, useRef } from 'react';
import { PRIORITIES } from '../utils/constants';
import { generateRepeatedTasks } from '../utils/generateRepeatedTasks';

function FloatingTaskInput({
  onClose,
  onAdd,
  onEdit,
  editingTask,
  selectedDate,
  energyLevel,
  availableTime,
  theme,
}) {
  const isEditMode = !!editingTask;

  const [text, setText] = useState(isEditMode ? editingTask.text : "");
  const [priority, setPriority] = useState(isEditMode ? editingTask.priority : "Medium");
  const [time, setTime] = useState(
    isEditMode && editingTask.dueDateTime ? editingTask.dueDateTime.slice(11, 16) : ""
  );
  const [date, setDate] = useState(isEditMode ? editingTask.date : selectedDate || getTodayDate());
  const [energy, setEnergy] = useState(isEditMode ? editingTask.energyLevel : energyLevel || 5);
  const [minutes, setMinutes] = useState(isEditMode ? editingTask.estimatedTime : availableTime || 60);
  const [repeat, setRepeat] = useState(isEditMode ? editingTask.repeat || "none" : "none");
  const [reminderBeforeMin, setReminderBeforeMin] = useState(
    isEditMode ? editingTask.reminderBeforeMin || 0 : 0
  );

  const inputRef = useRef(null);
  const isSaving = useRef(false);

  const reminderOptions = [
    { label: "No reminder", value: 0 },
    { label: "At time of event", value: -1 },
    { label: "5 minutes before", value: 5 },
    { label: "10 minutes before", value: 10 },
    { label: "30 minutes before", value: 30 },
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isEditMode && selectedDate) setDate(selectedDate);
  }, [selectedDate, isEditMode]);

  function getTodayDate() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  const save = () => {
    if (isSaving.current) return;
    if (!text.trim()) return;
    isSaving.current = true;

    const due = time ? `${date}T${time}` : null;
    const baseTask = {
      id: isEditMode ? editingTask.id : generateId(),
      text: text.trim(),
      priority,
      completed: isEditMode ? editingTask.completed : false,
      date,
      dueDateTime: due,
      energyLevel: energy,
      estimatedTime: minutes,
      repeat,
      reminderBeforeMin,
    };

    if (isEditMode) {
      onEdit(baseTask);
      onClose();
      isSaving.current = false;
    } else {
      const tasksToAdd = generateRepeatedTasks(baseTask);
      tasksToAdd.forEach((t) => onAdd(t));
      setText("");
      setPriority("Medium");
      setTime("");
      setEnergy(5);
      setMinutes(60);
      setRepeat("none");
      setReminderBeforeMin(0);
      onClose();
      setTimeout(() => {
        isSaving.current = false;
      }, 300);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      style={theme.modalOverlay}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="floating-task-input-title"
    >
      <div
        style={theme.modalContent}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <h2 id="floating-task-input-title" style={{ marginTop: 0, marginBottom: 16, color: theme.btn.background }}>
          {isEditMode ? "Edit Task" : "New Task"}
        </h2>

        {/* First row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Task..."
            aria-label={isEditMode ? "Edit task" : "New task"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ ...theme.input, flex: 1, minWidth: "150px", color: theme.page.color, backgroundColor: theme.input.backgroundColor || "inherit", border: theme.input.border }}
          />
        </div>

        {/* Second row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label
            htmlFor="priority-select"
            style={{ fontWeight: "600", color: theme.page.color, fontSize: 12, display: "flex", flexDirection: "column", minWidth: "110px" }}
          >
            Priority
            <select
              id="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                padding: "6px",
                borderRadius: 12,
                borderWidth: "1.5px",
                borderColor: "#aabfff",
                backgroundColor: theme.input.backgroundColor || "inherit",
                color: theme.page.color,
                width: "100%",
              }}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="energy-input"
            style={{ fontWeight: "600", color: theme.page.color, fontSize: 12, display: "flex", flexDirection: "column", minWidth: "110px" }}
          >
            Energy
            <input
              id="energy-input"
              type="number"
              min={1}
              max={10}
              value={energy}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 1) val = 1;
                if (val > 10) val = 10;
                setEnergy(val);
              }}
              style={{ width: "80%", padding: "6px", borderRadius: 12, border: theme.input.border, backgroundColor: theme.input.backgroundColor || "inherit", color: theme.page.color }}
            />
          </label>

          <label
            htmlFor="estimated-time-input"
            style={{ fontWeight: "600", color: theme.page.color, fontSize: 12, display: "flex", flexDirection: "column", minWidth: "130px" }}
          >
            Estimated Time (min)
            <input
              id="estimated-time-input"
              type="number"
              min={1}
              value={minutes}
              onChange={e => setMinutes(Math.max(0, Number(e.target.value)))}
              style={{ width: "80%", padding: "6px", borderRadius: 12, border: theme.input.border, backgroundColor: theme.input.backgroundColor || "inherit", color: theme.page.color }}
            />
          </label>
        </div>


        {/* Third row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label
            htmlFor="date-input"
            style={{ fontWeight: "600", marginBottom: 4, color: theme.page.color, minWidth: "70px", display: "flex", flexDirection: "column", fontSize: 12 }}
          >
            Date
            <input
              id="date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ ...theme.input, minWidth: "140px", color: theme.page.color, backgroundColor: theme.input.backgroundColor || "inherit", border: theme.input.border }}
            />
          </label>

          <label
            htmlFor="time-input"
            style={{ fontWeight: "600", marginBottom: 4, color: theme.page.color, minWidth: "70px", display: "flex", flexDirection: "column", fontSize: 12 }}
          >
            Time
            <input
              id="time-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ ...theme.input, minWidth: "110px", color: theme.page.color, backgroundColor: theme.input.backgroundColor || "inherit", border: theme.input.border }}
            />
          </label>
        </div>

        {/* Fourth row */}
        <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
          <label htmlFor="repeat-select" style={{ fontWeight: "600", marginBottom: 4, color: theme.page.color }}>
            Repeat
          </label>
          <select
            id="repeat-select"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 12, border: theme.input.border, backgroundColor: theme.input.backgroundColor || "inherit", color: theme.page.color, width: "100%" }}
          >
            <option value="none">Does not repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Fifth row */}
        <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
          <label htmlFor="reminder-select" style={{ fontWeight: "600", marginBottom: 4, color: theme.page.color }}>
            Reminder
          </label>
          <select
            id="reminder-select"
            value={reminderBeforeMin}
            onChange={(e) => setReminderBeforeMin(Number(e.target.value))}
            style={{ padding: "6px 10px", borderRadius: 12, border: theme.input.border, backgroundColor: theme.input.backgroundColor || "inherit", color: theme.page.color, width: "100%" }}
          >
            {reminderOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={save}
            disabled={!text.trim()}
            style={{ ...theme.btn, opacity: text.trim() ? 1 : 0.6, pointerEvents: text.trim() ? "auto" : "none", minWidth: "80px" }}
            aria-label={isEditMode ? "Save task" : "Add task"}
          >
            {isEditMode ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingTaskInput;