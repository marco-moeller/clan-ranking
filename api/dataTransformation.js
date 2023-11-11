import { calculateRaceID } from "@/utility/calculateRace";
import { getWeek } from "@/utility/matchesHelper";

export const transformPlayerDataToOurLiking = (playerData, player) => {
  const isGameMode1vs1 = (gameMode) => {
    return gameMode === 1;
  };

  const isMainRace = (race) => {
    return race === calculateRaceID(player.mainRace);
  };

  return (
    playerData
      //playerdata gives back an array of player-object
      //one object for each race and gameMode
      //we only want 1v1 so we have to filter
      .filter(
        (dataPoint) =>
          isGameMode1vs1(dataPoint.gameMode) && isMainRace(dataPoint.race)
      )
      .map((dataPoint) => ({
        name: player.name,
        mmr: dataPoint.mmr,
        race: calculateRaceID(player.mainRace),
        id: player.id,
        matches: [],
        mmrHistory: [],
      }))[0] || {
      name: player.name,
      mmr: 0,
      race: calculateRaceID(player.mainRace),
      id: player.id,
      matches: [],
      mmrHistory: [],
    }
  );
};

export const transformMatchesDataToOurLiking = (data, startDate) => {
  //no filter for main race
  //take all matches intentionally
  //subject to future change
  return data.matches
    .filter((match) => isNotJoinbug(match))
    .map((match) => ({
      week: getWeek(new Date(match.startTime), startDate),
      day: new Date(match.startTime).getDay(),
    }));
};

const isNotJoinbug = (match) => {
  return match.durationInSeconds > 60;
};

export const addMatchesToPlayer = (matches, player) => {
  player.matches = matches;
  return player;
};

export const transformMmrDataToOurLiking = (data, startDate) => {
  if (!data) {
    return [];
  }
  let newMmrHistory = data.mmrRpAtDates.map((date) => ({
    mmr: date.mmr,
    week: getWeek(new Date(date.date), startDate),
  }));
  //save first element
  let first = { mmr: newMmrHistory[0].mmr, week: 0 };
  //filter for unique elements
  //we need to revers first, because filter->findIndex takes only first element of any given week
  //and we want the last element, basically: with what mmr did the player finish the week
  newMmrHistory = [
    first,
    ...newMmrHistory
      .reverse()
      .filter(
        (dataPoint, index) =>
          newMmrHistory.findIndex((day) => day.week === dataPoint.week) ===
          index
      )
      //put it back in regular order
      .reverse(),
  ];
  return newMmrHistory;
};

export const addMmrHistoryToPlayer = (mmrHistory, player) => {
  player.mmrHistory = mmrHistory;
  return player;
};
