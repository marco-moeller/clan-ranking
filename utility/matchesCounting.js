export const getNumberOfMatchesAWeek = (matches, week) =>
  matches.filter((match) => match.week === week).length;

export const getNumberOfMatchesADay = (matches, week, day) => {
  if (day === 7) {
    day = 0;
  }
  return matches.filter((match) => match.week === week && match.day === day)
    .length;
};
