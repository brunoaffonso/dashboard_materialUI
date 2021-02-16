export function dateFormatList(value) {
  const date = new Date(value).toLocaleDateString('pt-BR');
  return date;
}

const dayOptions = { day: '2-digit' };
const monthOptions = { month: '2-digit' };
const yearOptions = { year: 'numeric' };

export function dateFormat(value) {
  const date = new Date(value);
  // date.setDate(date.getDate() + 1);
  const day = new Intl.DateTimeFormat('pt-BR', dayOptions).format(date);
  const month = new Intl.DateTimeFormat('pt-BR', monthOptions).format(date);
  const year = new Intl.DateTimeFormat('pt-BR', yearOptions).format(date);

  console.log(value);

  return `${year}-${month}-${day}`;
}

const formatter = new Intl.NumberFormat('pt-BR');

export function formatNumber(numberToFormat) {
  return formatter.format(numberToFormat);
}
