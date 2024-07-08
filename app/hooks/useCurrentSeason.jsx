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

  const [currentWeekOfTheSeason, setCurrentWeekOfTheSeason] = useState(0);
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
    const seasonInit = async () => {
      setLoadingSeason(true);
      const seasonNumber = await fetchCurrentSeasonNumber();
      const startDate = await getSeasonStartDate(seasonNumber);
      setSeason({
        startDate: startDate,
        season: seasonNumber,
        endDate: ""
      });
      setCurrentWeekOfTheSeason(getWeek(new Date(), startDate));
      setLoadingSeason(false);
    };

    const getNumberOfSeasonMatches = async (seasonNumber) => {
      return await fetchNumberOfMatchesInCurrentSeason(seasonNumber);
    };

    const getSeasonStartDate = async (seasonNumber) => {
      const numberOfMatchesInTheCurrentSeason =
        await getNumberOfSeasonMatches(seasonNumber);
      const data = await fetchFirstMatchOfTheSeason(
        seasonNumber,
        numberOfMatchesInTheCurrentSeason - 1
      );
      const startDate = new Date(data.matches[0].startTime);
      return startDate;
    };

    seasonInit();
  }, []);

  return { season, loadingSeason, currentWeekOfTheSeason, weeks, selectedWeek };
}
