import { formatDate, generateId } from './helpers';

export function generateRepeatedTasks(task) {
  if (!task.repeat || task.repeat === "none") return [task];

  const tasks = [];
  const generatedDates = new Set();
  let currentDate = new Date(task.date);
  const maxDate = new Date(currentDate);
  if (task.repeat === "daily") maxDate.setDate(maxDate.getDate() + 15);
  else maxDate.setDate(maxDate.getDate() + 365);

  while (currentDate <= maxDate) {
    const dateStr = formatDate(currentDate);
    if (!generatedDates.has(dateStr)) {
      const newTask = {
        ...task,
        id: generateId(),
        date: dateStr,
        dueDateTime: task.dueDateTime ? dateStr + task.dueDateTime.slice(10) : null,
      };
      tasks.push(newTask);
      generatedDates.add(dateStr);
    }
    switch (task.repeat) {
      case "daily":
        currentDate = new Date(currentDate.getTime() + 24 * 3600 * 1000);
        break;
      case "weekly":
        currentDate = new Date(currentDate.getTime() + 7 * 24 * 3600 * 1000);
        break;
      case "monthly":
        const y = currentDate.getFullYear(), m = currentDate.getMonth(), d = currentDate.getDate();
        let nextMonthDate = new Date(y, m + 1, 1);
        let lastDayNextMonth = new Date(y, m + 2, 0).getDate();
        nextMonthDate.setDate(d <= lastDayNextMonth ? d : lastDayNextMonth);
        currentDate = nextMonthDate;
        break;
      case "yearly":
        currentDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
        break;
      default:
        return tasks;
    }
  }
  return tasks;
}
