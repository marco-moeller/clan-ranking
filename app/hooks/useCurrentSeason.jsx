import {
  fetchCurrentSeasonNumber,
  fetchFirstMatchOfTheSeason,
  fetchNumberOfMatchesInCurrentSeason
} from "@/api/apiCalls";
import { getWeek } from "@/utility/matchesHelper";
import { useEffect, useState } from "react";
import useWeeks from "./useWeeks";

export default function useCurrentSeason(showWholeSeason, setShowWholeSeason) {
  const [loadingSeason, setLoadingSeason] = useState(true);
  const [season, setSeason] = useState({
    season: 0,
    startDate: new Date(),
    endDate: ""
  });

  const [currentWeekOfTheSeason, setCurrentWeekOfTheSeason] = useState(
    getWeek(new Date(), season.startDate)
  );
  const [selectedWeek, setSelectedWeek] = useState(
    getWeek(new Date(), season.startDate)
  );

  //all weeks of the season, for button creation
  const { weeks } = useWeeks({
    selectedWeek,
    showWholeSeason,
    setSelectedWeek,
    setShowWholeSeason,
    currentWeekOfTheSeason
  });

  useEffect(() => {
    setLoadingSeason(true);
    const seasonInit = async () => {
      const seasonNumber = await fetchCurrentSeasonNumber();
      setSeason((prevSeason) => ({
        ...prevSeason,
        season: seasonNumber
      }));
    };
    seasonInit();
  }, []);

  useEffect(() => {
    const getNumberOfSeasonMatches = async () => {
      return await fetchNumberOfMatchesInCurrentSeason(season.season);
    };

    const getSeasonStartDate = async () => {
      const numberOfMatchInTheCurrentSeason = await getNumberOfSeasonMatches();
      const data = await fetchFirstMatchOfTheSeason(
        season.season,
        numberOfMatchInTheCurrentSeason - 1
      );

      setSeason((prevSeason) => ({
        ...prevSeason,
        startDate: new Date(data.matches[0].startTime)
      }));
      setLoadingSeason(false);
    };

    if (season.season === 0) return;

    getSeasonStartDate();
  }, [season.season]);

  useEffect(() => {
    setCurrentWeekOfTheSeason(getWeek(new Date(), season.startDate));
  }, [season]);

  return { season, loadingSeason, currentWeekOfTheSeason, weeks, selectedWeek };
}
