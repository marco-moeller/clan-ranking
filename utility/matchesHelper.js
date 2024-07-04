export const getWeek = (date, seasonStart) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.floor(Math.abs((seasonStart - date) / oneDay));
  const seasonStartDay = seasonStart.getDay();
  const daysToFirstWeekEnd = seasonStartDay === 0 ? 1 : 8 - seasonStartDay;
  const dateDay = date.getDay() === 0 ? 7 : date.getDay();

  // add first and last week at the end, then +1 to start at week 1 and not 0
  const fullWeeks =
    Math.floor((diffDays - daysToFirstWeekEnd - dateDay) / 7) + 2 + 1;

  return fullWeeks;
};

export const getDayIndexFromDayString = (dayString) => {
  const days = {
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
    Su: 7
  };

  return days[dayString];
};
