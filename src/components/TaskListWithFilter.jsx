import { useState } from 'react';
import FilterBar from './FilterBar';
import EditableTaskItem from './EditableTaskItem';
import { formatDate } from '../utils/helpers';

function TaskListWithFilter({
  tasks,
  currentFilter,
  setCurrentFilter,
  onDelete,
  onToggle,
  onEdit,
  selectedDate,
  theme
}) {
  const [search, setSearch] = useState("");
  const now = new Date();
  const filterDate = selectedDate || formatDate(new Date());
  let list = tasks.filter(t => t.date === filterDate);

  const uniqueTasksMap = new Map();
  list.forEach(t => {
    const key = t.text + t.date;
    if (!uniqueTasksMap.has(key)) {
      uniqueTasksMap.set(key, t);
    }
  });
  list = Array.from(uniqueTasksMap.values());

  // select filter
  if (currentFilter === "Upcoming") {
    list = list.filter(
      t => !t.completed && t.dueDateTime && new Date(t.dueDateTime) >= now
    );
  } else if (currentFilter === "Finished") {
    list = list.filter(t => t.completed);
  }

  if (search.trim()) {
    const lower = search.toLowerCase();
    list = list.filter(t => t.text.toLowerCase().includes(lower));
  }

  // sort tasks
  list.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    const pr = { High: 3, Medium: 2, Low: 1 };
    return pr[b.priority] - pr[a.priority];
  });

  // remove repeated tasks in bulk
  const handleDelete = id => {
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
      idsToDelete.forEach(i => onDelete(i));
    } else {
      onDelete(id);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, marginTop: 12, alignItems: "center" }}>
        <div style={{ flex: 2 }}>
          <FilterBar currentFilter={currentFilter} setFilter={setCurrentFilter} theme={theme} />
        </div>
        <div style={{ flex: 3 }}>
          <input
            type="search"
            placeholder="Search tasks..."
            aria-label="Search tasks"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 16,
              border: theme.input.border,
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              color: theme.page.color,
              backgroundColor: theme.input.backgroundColor || "inherit"
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = theme.btn.background;
              e.currentTarget.style.boxShadow = `0 0 8px ${theme.btn.background}`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = theme.input.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>
      <ul style={{
        padding: "12px",
        margin: 0,
        listStyle: "none",
        flex: 1,
        overflowY: "auto",
        minHeight: 0,
        color: theme.page.color
      }}>
        {list.length === 0 && (
          <div style={{ marginTop: 12, textAlign: "center", color: theme.fontColorSecondary, fontStyle: "italic", userSelect: "none" }}>
            No tasks to show
          </div>
        )}

        {list.length !== 0 ?
          list.map(t => (
            <EditableTaskItem
              key={t.id}
              task={t}
              onDelete={handleDelete}
              onToggle={onToggle}
              onEdit={onEdit}
              theme={theme}
            />
          )) : null}
      </ul>
    </>
  );
}

export default TaskListWithFilter;