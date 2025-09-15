import { PRIORITY_COLORS_LIGHT, PRIORITY_COLORS_DARK } from '../utils/constants';
import { darkTheme } from '../themes/darkTheme';

function SuggestTask({ tasks, theme, currentEnergy, availableTime }) {
  const priorityValue = { Low: 1, Medium: 2, High: 3 };
  if (!Array.isArray(tasks) || tasks.length === 0) return null;

  // filter using incomplete tasks that fit energy and time constraints
  const incomplete = tasks.filter(
    (t) =>
      !t.completed &&
      (t.energyLevel === undefined || t.energyLevel <= currentEnergy) &&
      (t.estimatedTime === undefined || t.estimatedTime <= availableTime)
  );

  if (incomplete.length === 0)
    return (
      <div style={{ ...theme.suggestBox }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>Suggested Task</h3>
        <div style={{ fontStyle: "italic", color: theme.fontColorSecondary }}>
          No tasks to suggest
        </div>
      </div>
    );

  incomplete.sort((a, b) => {
    const prio = priorityValue[b.priority] - priorityValue[a.priority];
    if (prio !== 0) return prio;
    const da = a.dueDateTime ? new Date(a.dueDateTime) : new Date(8640000000000000);
    const db = b.dueDateTime ? new Date(b.dueDateTime) : new Date(8640000000000000);
    return da - db;
  });

  const top = incomplete[0];
  const colors = theme === darkTheme ? PRIORITY_COLORS_DARK : PRIORITY_COLORS_LIGHT;

  return (
    <div style={{ ...theme.suggestBox }}>
      <h3 style={{ margin: 0, marginBottom: 8 }}>Suggested Task</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: colors[top.priority] }}>
          {top.text}
        </div>
        <div style={{ color: theme.fontColorSecondary, fontWeight: 600 }}>
          Priority: {top.priority}
        </div>
        <div style={{ color: theme.fontColorSecondary, fontStyle: "italic" }}>
          {top.dueDateTime
            ? new Date(top.dueDateTime).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
              })
            : "No due time"}
        </div>
      </div>
    </div>
  );
}

export default SuggestTask;
