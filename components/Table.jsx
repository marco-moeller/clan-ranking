"use client";

import { useEffect, useState } from "react";
import { getWeek } from "../utility/matchesHelper";
import PlayerCard from "./PlayerCard";
import TableHead from "./TableHead";
import {
  fetchCurrentSeasonNumber,
  fetchPlayerData,
  fetchPlayerMatches,
  fetchPlayerMmrHistory,
} from "@/api/apiCalls";
import {
  transformMatchesDataToOurLiking,
  transformMmrDataToOurLiking,
  transformPlayerDataToOurLiking,
} from "@/api/dataTransformation";
import { nanoid } from "nanoid";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { ref, onValue } from "firebase/database";
import { db } from "@/database/config";

const Table = () => {
  const [season, setSeason] = useState({
    season: 0,
    startDate: new Date("2023-08-01"),
    endDate: "",
  });
  const [loadingSeason, setLoadingSeason] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(
    getWeek(new Date(), season.startDate)
  );
  const [players, setPlayers] = useState([]);
  const [showWholeSeason, setShowWholeSeason] = useState(true);

  const currentWeekOfTheSeason = getWeek(new Date(), season.startDate);
  //all weeks of the season, for button creation
  const [weeks, setWeeks] = useState(
    Array.apply(null, Array(currentWeekOfTheSeason))
  );

  const handleWeekClick = (index) => {
    setSelectedWeek(index);
    setShowWholeSeason(false);
  };

  const getWeekButtonStyle = (index) => {
    return index === selectedWeek && !showWholeSeason ? "current--week" : "";
  };

  const sortBy = (property) => {
    setPlayers((prevPlayers) => _.sortBy(prevPlayers, [property]).reverse());
  };

  //populate week buttons based on season length
  useEffect(() => {
    const renderWeeks = () => {
      setWeeks((prevWeeks) =>
        prevWeeks.map((_, index) => (
          <button
            className={"" + getWeekButtonStyle(index + 1)}
            onClick={() => handleWeekClick(index + 1)}
            key={nanoid()}
          >
            {index + 1}
          </button>
        ))
      );
    };
    renderWeeks();
  }, [selectedWeek, showWholeSeason]);

  // Main Initialization
  useEffect(() => {
    const initializePlayersWithApiData = async (player) => {
      const newPlayer = transformPlayerDataToOurLiking(
        await fetchPlayerData(player, season.season),
        player
      );

      const newPlayerWithMatches = await initializePlayerMatches(newPlayer);
      const newPlayerWithMatchesAndMmrHistory =
        await initializePlayerMmrHistory(newPlayerWithMatches);
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        newPlayerWithMatchesAndMmrHistory,
      ]);
      setLoadingPlayers(false);
      sortBy("matches.length");
    };

    const initializePlayerMatches = async (player) => {
      const matches = transformMatchesDataToOurLiking(
        await fetchPlayerMatches(player, season.season),
        season.startDate
      );
      return { ...player, matches: matches };
    };

    const initializePlayerMmrHistory = async (player) => {
      const mmrHistory = transformMmrDataToOurLiking(
        await fetchPlayerMmrHistory(player, season.season),
        season.startDate
      );
      return { ...player, mmrHistory: mmrHistory };
    };
    if (!loadingSeason) {
      setLoadingPlayers(true);
      const playersInDatabase = ref(db, "players/");

      onValue(playersInDatabase, async (snapshot) => {
        const data = Object.entries(snapshot.val()).map((player) => player[1]);
        setPlayers([]);
        data.map((player) => initializePlayersWithApiData(player));
      });
    }

    return () => setPlayers([]);
  }, [loadingSeason]);

  //get current season
  useEffect(() => {
    setLoadingSeason(true);
    const seasonInit = async () => {
      const seasonNumber = await fetchCurrentSeasonNumber();
      setSeason((prevSeason) => ({
        ...prevSeason,
        season: seasonNumber,
      }));
      setLoadingSeason(false);
    };
    seasonInit();
  }, []);

  //dynamic layout depending on number of weeks, change on resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1320 && window.innerWidth >= 1020) {
        document.body.style.setProperty(
          "--columnsSeason",
          4 + currentWeekOfTheSeason
        );
      }
      if (window.innerWidth >= 1320) {
        document.body.style.setProperty(
          "--columnsSeason",
          5 + currentWeekOfTheSeason
        );
      }
      if (window.innerWidth < 1020) {
        document.body.style.setProperty("--columnsSeason", 4);
      }
    });
  }, []);

  //dynamic layout depending on number of weeks, for init
  useEffect(() => {
    if (window.innerWidth < 1320 && window.innerWidth >= 1020) {
      document.body.style.setProperty(
        "--columnsSeason",
        4 + currentWeekOfTheSeason
      );
    }
    if (window.innerWidth >= 1320) {
      document.body.style.setProperty(
        "--columnsSeason",
        5 + currentWeekOfTheSeason
      );
    }
    if (window.innerWidth < 1020) {
      document.body.style.setProperty("--columnsSeason", 4);
    }
  }, []);

  return (
    <>
      {loadingSeason && <Loading />}
      {!loadingSeason && (
        <Navbar
          setShowWholeSeason={setShowWholeSeason}
          weeks={weeks}
          season={season.season}
          showWholeSeason={showWholeSeason}
        />
      )}
      {loadingPlayers && !loadingSeason && <Loading />}
      {!loadingPlayers && (
        <div className={showWholeSeason ? "season--table" : "week--table"}>
          <TableHead
            showWholeSeason={showWholeSeason}
            setPlayers={setPlayers}
            selectedWeek={selectedWeek}
            weeks={weeks}
            sortBy={sortBy}
          />
          {players.map((player, index) => (
            <PlayerCard
              isLast={index === players.length - 1}
              player={player}
              id={index + 1}
              key={player.name + "#" + player.id}
              week={currentWeekOfTheSeason}
              selectedWeek={selectedWeek}
              showWholeSeason={showWholeSeason}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Table;
