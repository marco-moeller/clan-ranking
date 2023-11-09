export const getMmrDifference = (weekStartMmr, weekEndMmr) => {
  return weekEndMmr - weekStartMmr;
};

export const getPrevWeekMmr = (week, player) => {
  if (week < 1) return player.mmrHistory[0] || player.mmr;

  let preWeekMmr = player.mmrHistory.filter(
    (weekWithMmrSnapshot) => weekWithMmrSnapshot.week === week - 1
  );
  if (preWeekMmr.length !== 0) {
    return preWeekMmr[0].mmr;
  } else {
    return getPrevWeekMmr(week - 1, player);
  }
};

export const getWeekEndMmr = (week, player) => {
  return getPrevWeekMmr(week + 1, player);
};
