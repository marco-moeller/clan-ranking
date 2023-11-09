export const calculateRace = (raceID) => {
  const raceIds = {
    0: "Random",
    1: "Human",
    2: "Orc",
    4: "Nightelf",
    8: "Undead",
  };

  return raceIds[raceID];
};

export const calculateRaceID = (race) => {
  const races = {
    Random: 0,
    Human: 1,
    Orc: 2,
    Nightelf: 4,
    Undead: 8,
  };

  return races[race];
};
