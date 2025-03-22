import { getNumberOfMatchesADay } from "@/utility/matchesCounting";
import { getDayShortHandleFromIndex } from "@/utility/matchesHelper";
import { getPrevWeekMmr, getWeekEndMmr } from "@/utility/mmrCalculation";
import { useEffect, useState } from "react";

const Week = ({ player, selectedWeek, week }) => {
  const [matchesADay, setMatchesADay] = useState([]);
  const prevWeekMmr = getPrevWeekMmr(selectedWeek, player);
  const weekEndMmr = getWeekEndMmr(selectedWeek, player);

  const renderMatchesADay = () => {
    for (let index = 1; index <= 7; index++) {
      setMatchesADay((prevMatches) => [
        ...prevMatches,
        <div className="day" key={index}>
          <p className="day-tag">{getDayShortHandleFromIndex(index)}</p>
          <h3 key={index}>
            {" "}
            {getNumberOfMatchesADay(player.matches, selectedWeek, index)}{" "}
          </h3>
        </div>
      ]);
    }
  };

  const getMmrDifferenceStyle = (mmrDifference) => {
    if (mmrDifference === 0) return;

    return mmrDifference > 0 ? "green" : "red";
  };

  useEffect(() => {
    renderMatchesADay();

    return () => setMatchesADay([]);
  }, [player, selectedWeek]);

  return (
    <section className="week">
      {/* <div className="mmr">
        <p className="day-tag">START MMR</p>

        <h3 className="start--mmr ">{prevWeekMmr}</h3>
      </div> */}
      {matchesADay}
      {/* <div className="mmr">
        <p className="day-tag">END MMR</p>

        <h3 className=" end--mmr">
          {selectedWeek === week ? player.mmr : weekEndMmr}
        </h3>
      </div> */}
      <div className="mmr-gain">
        <p className="day-tag">MMR +/-</p>
        <h3 className={getMmrDifferenceStyle(weekEndMmr - prevWeekMmr)}>
          {weekEndMmr - prevWeekMmr}
        </h3>
      </div>
    </section>
  );
};

export default Week;
