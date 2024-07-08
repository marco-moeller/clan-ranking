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
    const seasonInit = async () => {
      const seasonNumber = await fetchCurrentSeasonNumber();
      const startDate = await getSeasonStartDate();
      setSeason({
        startDate: startDate,
        season: seasonNumber,
        endDate: ""
      });
      setCurrentWeekOfTheSeason(getWeek(new Date(), startDate));
    };

    const getNumberOfSeasonMatches = async () => {
      return await fetchNumberOfMatchesInCurrentSeason(season.season);
    };

    const getSeasonStartDate = async () => {
      const numberOfMatchesInTheCurrentSeason =
        await getNumberOfSeasonMatches();
      const data = await fetchFirstMatchOfTheSeason(
        season.season,
        numberOfMatchesInTheCurrentSeason - 1
      );
      const startDate = new Date(data.matches[0].startTime);
      return startDate;
    };

    setLoadingSeason(true);
    seasonInit();
    setLoadingSeason(false);
  }, []);

  return { season, loadingSeason, currentWeekOfTheSeason, weeks, selectedWeek };
}
