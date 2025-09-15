export const pad = n => String(n).padStart(2, '0');

export const formatDate = date => {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return `${y}-${m}-${d}`;
};

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const isDueSoon = dueDateTime => {
  if (!dueDateTime) return false;
  const diffMs = new Date(dueDateTime) - new Date();
  return diffMs > 0 && diffMs <= 60 * 60 * 1000;
};
