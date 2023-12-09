import { getNumberOfMatchesADay } from "@/utility/matchesCounting";
import { isInMobileView } from "@/utility/views";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MobileWeek = ({ player, selectedWeek }) => {
  const [matchesADay, setMatchesADay] = useState([]);

  const renderMatchesADay = () => {
    for (let index = 1; index <= 7; index++) {
      setMatchesADay((prevMatches) => [
        ...prevMatches,
        <h3 className="mobile-week-el" key={nanoid()}>
          {" "}
          {getNumberOfMatchesADay(player.matches, selectedWeek, index)}{" "}
        </h3>
      ]);
    }
  };

  useEffect(() => {
    renderMatchesADay();

    return () => setMatchesADay([]);
  }, [player, selectedWeek]);

  return (
    <>
      <div>
        {WEEKDAYS.map((day) => (
          <h2 className="mobile-week-el" key={day}>
            {day}
          </h2>
        ))}
      </div>
      <div>{matchesADay}</div>
    </>
  );
};

export default MobileWeek;
