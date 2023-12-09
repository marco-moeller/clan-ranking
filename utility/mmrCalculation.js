export const getMmrDifference = (weekStartMmr, weekEndMmr) =>
  weekEndMmr - weekStartMmr;

export const getPrevWeekMmr = (week, player) => {
  if (week < 1) return player.mmrHistory[0] || player.mmr;

  const preWeekMmr = player.mmrHistory.filter(
    (weekWithMmrSnapshot) => weekWithMmrSnapshot.week === week - 1
  );
  if (preWeekMmr.length !== 0) {
    return preWeekMmr[0].mmr;
  }
  return getPrevWeekMmr(week - 1, player);
};

export const getWeekEndMmr = (week, player) => getPrevWeekMmr(week + 1, player);
