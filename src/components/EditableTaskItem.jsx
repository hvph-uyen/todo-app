import { useState } from 'react';
import FloatingTaskInput from './FloatingTaskInput';
import { PRIORITY_COLORS_LIGHT } from '../utils/constants';
import { isDueSoon } from '../utils/helpers';
import { formatDate } from '../utils/helpers';

function EditableTaskItem({ task, onDelete, onToggle, onEdit, theme }) {
  const [isEditing, setIsEditing] = useState(false);

  const isOverdue = !task.completed && task.dueDateTime && new Date(task.dueDateTime) < new Date();
  const noTimeOverdue =
    !task.completed &&
    !task.dueDateTime &&
    task.date &&
    new Date(task.date) < new Date(formatDate(new Date()));
  const dueSoon = isDueSoon(task.dueDateTime);

  const baseStyle = {
    listStyle: "none",
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    display: "flex",
    gap: 10,
    alignItems: "center",
    background: "transparent",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    color: theme.page.color
  };

  if (isOverdue || noTimeOverdue) {
    baseStyle.background = theme.overdueBg;
  } else if (dueSoon) {
    baseStyle.background = theme.dueSoonBg;
  }

  if (isEditing) {
    return (
      <FloatingTaskInput
        editingTask={task}
        onEdit={t => {
          onEdit(t);
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
        theme={theme}
      />
    );
  }

  return (
    <li
      style={baseStyle}
      title={isOverdue || noTimeOverdue ? "Task is overdue" : dueSoon ? "Due soon" : undefined}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.text} as ${task.completed ? "incomplete" : "complete"}`}
        style={theme.checkbox}
      />

      <div
        onDoubleClick={() => setIsEditing(true)}
        style={{
          flex: 1,
          cursor: "text",
          userSelect: "text",
          color: PRIORITY_COLORS_LIGHT[task.priority] || theme.page.color,
          outline: "none"
        }}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter") setIsEditing(true);
        }}
      >
        <div
          style={{
            fontWeight: 600,
            textDecoration: task.completed ? "line-through" : "none"
          }}
        >
          {task.text}
        </div>
        <div
          style={{
            fontSize: 12,
            color: theme.fontColorSecondary,
            marginTop: 4,
            display: "flex",
            gap: 8,
            alignItems: "center"
          }}
        >
          <span>{new Date(task.date).toLocaleDateString("en-GB")}</span>
          {(task.dueDateTime || task.date) && (
            <span
              style={{
                fontWeight: 700,
                color:
                  isOverdue || noTimeOverdue
                    ? "#cc0000"
                    : dueSoon
                      ? "#e67e22"
                      : theme.fontColorSecondary
              }}
            >
              Due {task.dueDateTime ? task.dueDateTime.slice(11, 16) : "23:59"}{" "}
              {dueSoon ? "⚠️" : isOverdue || noTimeOverdue ? "⏰" : ""}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.text}`}
        title="Delete task"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20,
          color: "#e74c3c",
          transition: "color 0.3s ease"
        }}
        onMouseOver={e => (e.currentTarget.style.color = "#b22222")}
        onMouseOut={e => (e.currentTarget.style.color = "#e74c3c")}
      >
        🗑️
      </button>
    </li>
  );
}

export default EditableTaskItem;