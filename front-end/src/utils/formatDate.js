const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December',
];

export function formatAsMonthDay(date) {
  // const yymmdd = date.split(':')[0];
  // const time = date.split(':')[1];
  // const month = yymmdd.split("-")[1];
  // const day = yymmdd.split("-")[2];
  const month = new Date(date).getMonth();
  const day = new Date(date).getDay();
  return `${MONTHS[month - 1]} ${day}`;
}
