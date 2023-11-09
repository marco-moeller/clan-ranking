import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const Season = ({ player, week }) => {
  const [matchesAWeek, setMatchesAWeek] = useState([]);

  const renderMatchesPerWeek = () => {
    for (let index = 1; index <= week; index++) {
      setMatchesAWeek((prevMatches) => [
        ...prevMatches,
        <h3 className="matches--a--week" key={nanoid()}>
          {getNumberOfMatchesAWeek(player.matches, index)}{" "}
        </h3>,
      ]);
    }
  };
  useEffect(() => {
    renderMatchesPerWeek();
  }, [player]);

  return matchesAWeek;
};

export default Season;
