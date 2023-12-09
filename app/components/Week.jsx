import { getNumberOfMatchesADay } from "@/utility/matchesCounting";
import { getPrevWeekMmr, getWeekEndMmr } from "@/utility/mmrCalculation";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const Week = ({ player, selectedWeek, week }) => {
  const [matchesADay, setMatchesADay] = useState([]);
  const [prevWeekMmr, setPrevWeekMmr] = useState(0);
  const [weekEndMmr, setWeekEndMmr] = useState(0);

  const renderMatchesADay = () => {
    for (let index = 1; index <= 7; index++) {
      setMatchesADay((prevMatches) => [
        ...prevMatches,
        <h3 className="matches--a--week weekday" key={nanoid()}>
          {" "}
          {getNumberOfMatchesADay(player.matches, selectedWeek, index)}{" "}
        </h3>,
      ]);
    }
  };

  const getMmrDifferenceStyle = (mmrDifference) => {
    if (mmrDifference === 0) return;

    return mmrDifference > 0 ? "green" : "red";
  };

  useEffect(() => {
    renderMatchesADay();
    setPrevWeekMmr(getPrevWeekMmr(selectedWeek, player));
    setWeekEndMmr(getWeekEndMmr(selectedWeek, player));

    return () => setMatchesADay([]);
  }, [player, selectedWeek]);

  return (
    <>
      <h3 className="start--mmr table--element">{prevWeekMmr}</h3>
      {matchesADay}
      <h3 className="table--element end--mmr">
        {selectedWeek === week ? player.mmr : weekEndMmr}
      </h3>
      <h3
        className={
          getMmrDifferenceStyle(weekEndMmr - prevWeekMmr) + " table--element "
        }
      >
        {weekEndMmr - prevWeekMmr}
      </h3>
    </>
  );
};

export default Week;
