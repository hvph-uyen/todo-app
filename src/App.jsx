import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import FloatingTaskInput from './components/FloatingTaskInput';
import SuggestTask from './components/SuggestTask';
import TaskListWithFilter from './components/TaskListWithFilter';
import Calendar from './components/Calendar';
import AppNameLogo from './components/AppNameLogo';
import ReminderModal from './components/ReminderModal';
import { generateId } from './utils/helpers';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';
import { generateRepeatedTasks } from './utils/generateRepeatedTasks';

/* ------------------- Main App ------------------- */
export default function ToDoApp() {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [availableTime, setAvailableTime] = useState(0);
  const [showFloatingInput, setShowFloatingInput] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [reminderTask, setReminderTask] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const [tasks, setTasksState] = useState(() => {
    const saved = localStorage.getItem('todo-with-calendar-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todo-with-calendar-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = baseTask => {
    const tasksToAdd = generateRepeatedTasks(baseTask);
    setTasksState(prev => [...prev, ...tasksToAdd]);
  };

  const editTask = (updatedTask) => {
    setTasksState(prev => {
      const oldTask = prev.find(t => t.id === updatedTask.id);
      if (!oldTask) return prev;
      if (oldTask.repeat === updatedTask.repeat) {
        return prev.map(t => (t.id === updatedTask.id ? updatedTask : t));
      }

      const repeatGroupId = oldTask.repeatGroupId || generateId();
      const filtered = prev.filter(t => t.repeatGroupId !== repeatGroupId);
      const updatedGroupTask = { ...updatedTask, repeatGroupId };
      const newRepeats = generateRepeatedTasks(updatedGroupTask);

      return [...filtered, ...newRepeats];
    });
  };

  const deleteTask = id => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;
    if (taskToDelete.repeat && taskToDelete.repeat !== 'none') {
      const baseDate = new Date(taskToDelete.date);
      const repeatedTasks = tasks.filter(t =>
        t.repeat === taskToDelete.repeat &&
        t.text === taskToDelete.text &&
        new Date(t.date) >= baseDate &&
        !t.completed
      );
      const idsToDelete = repeatedTasks.map(t => t.id);
      setTasksState(prev => prev.filter(t => !idsToDelete.includes(t.id)));
    } else {
      setTasksState(prev => prev.filter(t => t.id !== id));
    }
  };

  const toggleTask = id => {
    setTasksState(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  useEffect(() => {
    if (selectedDate) setCurrentFilter('All');
  }, [selectedDate]);
  useEffect(() => {
    if (currentFilter !== 'All' && selectedDate) setSelectedDate(null);
  }, [currentFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (reminderTask) return;
      const now = new Date();
      for (const task of tasks) {
        if (!task.completed && task.dueDateTime && task.reminderBeforeMin !== 0) {
          const dueDate = new Date(task.dueDateTime);
          const offsetMinutes = task.reminderBeforeMin === -1 ? 0 : task.reminderBeforeMin;
          let preMin = offsetMinutes; if (preMin === -1) preMin = -4;
          const reminderTime = new Date(dueDate.getTime() - (3+preMin) * 60000);
          if (reminderTime <= now && now < dueDate) {
            setReminderTask(task);
            break;
          }
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks, reminderTask]);

  const currentTheme = darkMode ? darkTheme : lightTheme;

  const mobileInputStyle = {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: 12,
    border: currentTheme.input.border,
    backgroundColor: currentTheme.input.backgroundColor || 'inherit',
    color: currentTheme.page.color,
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 6,
  };

  if (isMobile) { // mobile layout
    return (
      <div
        style={{
          ...currentTheme.page,
          flexDirection: 'column',
          padding: '1rem',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <AppNameLogo theme={currentTheme} />
        <h2 style={{ color: currentTheme.btn.background, marginBottom: 16 }}>
          What task should you do now?
        </h2>

        <div style={{ ...currentTheme.card, marginBottom: 20 }}>
          <label style={{ color: currentTheme.fontColorSecondary, fontWeight: 600 }}>
            Energy level right now (1-10):
            <input
              type="number"
              min={1}
              max={10}
              value={energyLevel}
              onChange={e => setEnergyLevel(Math.max(1, Math.min(10, Number(e.target.value))))}
              style={mobileInputStyle}
            />
          </label>

          <label style={{ color: currentTheme.fontColorSecondary, fontWeight: 600, marginTop: 12 }}>
            Available time now (minutes):
            <input
              type="number"
              min={1}
              value={availableTime}
              onChange={e => setAvailableTime(Math.max(0, Number(e.target.value)))}
              style={mobileInputStyle}
            />
          </label>
        </div>

        <SuggestTask
          tasks={tasks}
          theme={currentTheme}
          currentEnergy={energyLevel}
          availableTime={availableTime}
        />

        <div style={{ marginTop: 16 }}>
          <Calendar
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            theme={currentTheme}
          />
        </div>

        <div style={{ marginTop: 20, ...currentTheme.card }}>
          <TaskListWithFilter
            tasks={tasks}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
            selectedDate={selectedDate}
            theme={currentTheme}
          />
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 12,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <button
              aria-label="Open new task input"
              style={{
                ...currentTheme.ghostBtn,
                flexGrow: 1,
                minWidth: 50,
                marginBottom: 8,
              }}
              onClick={() => {
                setEditingTask(null);
                setShowFloatingInput(true);
              }}
            >
              ＋
            </button>
            <button
              onClick={() => setDarkMode(d => !d)}
              aria-label="Toggle dark mode"
              style={{
                padding: '6px 12px',
                borderRadius: 12,
                border: `2px solid ${currentTheme.btn.background}`,
                background: 'transparent',
                color: currentTheme.btn.background,
                fontWeight: 600,
                cursor: 'pointer',
                flexGrow: 2,
                minWidth: 80,
              }}
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {showFloatingInput && (
          <FloatingTaskInput
            onAdd={addTask}
            onEdit={editTask}
            onClose={() => setShowFloatingInput(false)}
            editingTask={editingTask}
            selectedDate={selectedDate}
            energyLevel={energyLevel}
            setEnergyLevel={setEnergyLevel}
            availableTime={availableTime}
            setAvailableTime={setAvailableTime}
            theme={currentTheme}
          />
        )}

        {reminderTask && (
          <ReminderModal task={reminderTask} onClose={() => setReminderTask(null)} />
        )}
      </div>
    );
  }

  return (
    <div style={{ ...currentTheme.page }}>
      <section style={{ ...currentTheme.leftPanel }}>
        <AppNameLogo theme={currentTheme} />
        <div style={{ fontWeight: 800, fontSize: 18, color: currentTheme.btn.background }}>
          What task should you do now?
        </div>
        <div style={{ ...currentTheme.card, marginTop: 8 }}>
          <label style={{ display: 'block', marginBottom: 8, color: currentTheme.fontColorSecondary }}>
            Energy level right now (1-10):
            <input
              type="number"
              min={1}
              max={10}
              value={energyLevel}
              onChange={e => setEnergyLevel(Math.max(0, Math.min(10, Number(e.target.value))))}
              style={{ marginLeft: 8, width: 64, padding: '6px 8px', borderRadius: 12, border: currentTheme.input.border, fontSize: '1rem', backgroundColor: currentTheme.input.backgroundColor || 'inherit', color: currentTheme.page.color }}
            />
          </label>
          <label style={{ display: 'block', color: currentTheme.fontColorSecondary }}>
            Available time now (minutes):
            <input
              type="number"
              min={1}
              value={availableTime}
              onChange={e => setAvailableTime(Math.max(0, Number(e.target.value)))}
              style={{ marginLeft: 8, width: 88, padding: '6px 8px', borderRadius: 12, border: currentTheme.input.border, fontSize: '1rem', backgroundColor: currentTheme.input.backgroundColor || 'inherit', color: currentTheme.page.color }}
            />
          </label>
        </div>

      <SuggestTask
        tasks={tasks}
        theme={currentTheme}
        currentEnergy={energyLevel}
        availableTime={availableTime}
      />
      <div style={{ marginTop: 12 }}>
        <Calendar
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          theme={currentTheme}
        />
        </div>
      </section>

      <section style={{ ...currentTheme.rightPanel, position: 'relative' }}>
        <div style={{ ...currentTheme.card, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <TaskListWithFilter
            tasks={tasks}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
            selectedDate={selectedDate}
            theme={currentTheme}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <button aria-label="Open new task input" style={{ ...currentTheme.ghostBtn, alignSelf: 'center' }} onClick={() => { setEditingTask(null); setShowFloatingInput(true); }}>＋</button>
            <button onClick={() => setDarkMode(d => !d)} aria-label="Toggle dark mode" style={{ padding: '6px 12px', borderRadius: 12, border: `2px solid ${currentTheme.btn.background}`, background: 'transparent', color: currentTheme.btn.background, fontWeight: 600, cursor: 'pointer' }}>{darkMode ? 'Light' : 'Dark'}</button>
          </div>
        </div>

        {showFloatingInput && (
          <FloatingTaskInput
            onAdd={addTask}
            onEdit={editTask}
            onClose={() => setShowFloatingInput(false)}
            editingTask={editingTask}
            selectedDate={selectedDate}
            energyLevel={energyLevel}
            setEnergyLevel={setEnergyLevel}
            availableTime={availableTime}
            setAvailableTime={setAvailableTime}
            theme={currentTheme}
          />
        )}

        {reminderTask && <ReminderModal task={reminderTask} onClose={() => setReminderTask(null)} />}
      </section>
    </div>
  );
}