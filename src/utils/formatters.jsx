export const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

export const formatDateTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
