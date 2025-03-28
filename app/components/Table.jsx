"use client";

import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import {
  fetchPlayerData,
  fetchPlayerMatches,
  fetchPlayerMmrHistory
} from "@/api/apiCalls";
import {
  transformMatchesDataToOurLiking,
  transformMmrDataToOurLiking,
  transformPlayerDataToOurLiking
} from "@/api/dataTransformation";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { ref, onValue } from "firebase/database";
import db from "@/database/config";
import useCurrentSeason from "../hooks/useCurrentSeason";
import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import TableHead from "./TableHead";

const Table = () => {
  const [showWholeSeason, setShowWholeSeason] = useState(false);

  const { season, loadingSeason, currentWeekOfTheSeason, weeks, selectedWeek } =
    useCurrentSeason({ showWholeSeason, setShowWholeSeason });

  const [loadingPlayers, setLoadingPlayers] = useState(true);

  const [players, setPlayers] = useState([]);

  const sortByMatchesAWeek = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getNumberOfMatchesAWeek(b.matches, selectedWeek) -
          getNumberOfMatchesAWeek(a.matches, selectedWeek)
      )
    ]);
  };

  const sortByMatchesASeason = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort((a, b) => b.matches.length - a.matches.length)
    ]);
  };

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
        newPlayerWithMatchesAndMmrHistory
      ]);
      setLoadingPlayers(false);
      sortByMatchesAWeek();
    };

    const initializePlayerMatches = async (player) => {
      const matches = transformMatchesDataToOurLiking(
        await fetchPlayerMatches(player, season.season),
        season.startDate,
        player
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

  // //dynamic layout depending on number of weeks, change on resize
  // useEffect(() => {
  //   const resize = () => {
  //     {
  //       if (isInTabletView()) {
  //         document.body.style.setProperty(
  //           "--columnsSeason",
  //           4 + currentWeekOfTheSeason
  //         );
  //       }
  //       if (isInDesktopView()) {
  //         document.body.style.setProperty(
  //           "--columnsSeason",
  //           5 + currentWeekOfTheSeason
  //         );
  //       }
  //       if (isInMobileView()) {
  //         document.body.style.setProperty("--columnsSeason", 3);
  //       }
  //     }
  //   };

  //   window.addEventListener("resize", resize);
  //   return () => window.removeEventListener("resize", resize);
  // }, [currentWeekOfTheSeason]);

  // //dynamic layout depending on number of weeks, for init
  // useEffect(() => {
  //   if (window.innerWidth < 1320 && window.innerWidth >= 1020) {
  //     document.body.style.setProperty(
  //       "--columnsSeason",
  //       4 + currentWeekOfTheSeason
  //     );
  //   }
  //   if (window.innerWidth >= 1320) {
  //     document.body.style.setProperty(
  //       "--columnsSeason",
  //       5 + currentWeekOfTheSeason
  //     );
  //   }
  //   if (window.innerWidth < 1020) {
  //     document.body.style.setProperty("--columnsSeason", 3);
  //   }
  // }, [currentWeekOfTheSeason]);

  useEffect(() => {
    sortByMatchesAWeek();
  }, [selectedWeek, showWholeSeason]);

  useEffect(() => {
    if (!showWholeSeason) return;

    sortByMatchesASeason();
  }, [showWholeSeason]);

  return (
    <>
      {!loadingSeason && (
        <Navbar
          setShowWholeSeason={setShowWholeSeason}
          weeks={weeks}
          season={season.season}
          showWholeSeason={showWholeSeason}
        />
      )}
      <main>
        <TableHead
          showWholeSeason={showWholeSeason}
          setPlayers={setPlayers}
          selectedWeek={selectedWeek}
          weeks={weeks}
        />
        {(loadingPlayers && <Loading />) || (<Loading /> && loadingSeason)}
        {!loadingPlayers && !loadingSeason && (
          <div className={showWholeSeason ? "season--table" : "week--table"}>
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
      </main>
    </>
  );
};

export default Table;
