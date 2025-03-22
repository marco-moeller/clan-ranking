import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import { useEffect, useState } from "react";

const Season = ({ player, week }) => {
  const [matchesAWeek, setMatchesAWeek] = useState([]);

  const renderMatchesPerWeek = () => {
    for (let index = 1; index <= week; index++) {
      setMatchesAWeek((prevMatches) => [
        ...prevMatches,
        <div className="week-of-the-season" key={index}>
          <p className="day-tag">Week {index}</p>
          <h3 className="matches--a--week">
            {getNumberOfMatchesAWeek(player.matches, index)}{" "}
          </h3>
        </div>
      ]);
    }
  };
  useEffect(() => {
    renderMatchesPerWeek();
  }, [player]);

  return <section className="season"> {matchesAWeek}</section>;
};

export default Season;
