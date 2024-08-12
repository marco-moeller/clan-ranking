import { calculateRaceID } from "@/utility/calculateRace";
import { getWeek } from "@/utility/matchesHelper";

const JOIN_BUG_SECONDS_LIMIT = 60;
const GAME_MODE = 1; // 1vs1

const isNotJoinbug = (match) =>
  match.durationInSeconds > JOIN_BUG_SECONDS_LIMIT;

const isMainRace = (player, race) => race === calculateRaceID(player.mainRace);

export const transformPlayerDataToOurLiking = (playerData, player) => {
  const isGameMode1vs1 = (gameMode) => gameMode === GAME_MODE;

  return (
    playerData
      //  playerdata gives back an array of player-objects
      //  one object for each race and gameMode
      //  we only want 1v1 so we have to filter

      .filter(
        (dataPoint) =>
          isGameMode1vs1(dataPoint.gameMode) &&
          isMainRace(player, dataPoint.race)
      )
      .map((dataPoint) => ({
        name: player.name,
        mmr: dataPoint.mmr,
        race: calculateRaceID(player.mainRace),
        id: player.id,
        matches: [],
        mmrHistory: []
      }))[0] || {
      name: player.name,
      mmr: 0,
      race: calculateRaceID(player.mainRace),
      id: player.id,
      matches: [],
      mmrHistory: []
    }
  );
};

export const transformMatchesDataToOurLiking = (data, startDate, player) => {
  const playerIsPlayingMainRaceInThisMatch = (match, player) => {
    return (
      (match.teams[0].players[0].battleTag === `${player.name}#${player.id}` &&
        player.race === match.teams[0].players[0].race) ||
      (match.teams[1].players[0].battleTag === `${player.name}#${player.id}` &&
        player.race === match.teams[1].players[0].race)
    );
  };

  return data.matches
    .filter(
      (match) =>
        isNotJoinbug(match) && playerIsPlayingMainRaceInThisMatch(match, player)
    )
    .map((match) => ({
      week: getWeek(new Date(match.startTime.split("T")[0]), startDate),
      day: new Date(match.startTime.split("T")[0]).getDay()
    }));
};

export const addMatchesToPlayer = (matches, player) => {
  return { ...player, matches };
};

export const transformMmrDataToOurLiking = (data, startDate) => {
  if (!data) {
    return [];
  }
  let newMmrHistory = data.mmrRpAtDates.map((date) => ({
    mmr: date.mmr,
    //take timezone off the date to make it server time basically, meaning we get a cutoff for mmr at 2am
    week: getWeek(new Date(date.date.split("T")[0]), startDate)
  }));
  // save first element
  const first = { mmr: newMmrHistory[0].mmr, week: 0 };
  // filter for unique elements
  // we need to revers first, because filter->findIndex takes only first element of any given week
  // and we want the last element, basically: with what mmr did the player finish the week
  newMmrHistory = [
    first,
    ...newMmrHistory
      .reverse()
      .filter(
        (dataPoint, index) =>
          newMmrHistory.findIndex((day) => day.week === dataPoint.week) ===
          index
      )
      // put it back in regular order
      .reverse()
  ];
  return newMmrHistory;
};

export const addMmrHistoryToPlayer = (mmrHistory, player) => {
  return { ...player, mmrHistory };
};
