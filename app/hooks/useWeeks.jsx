import { useEffect, useState } from "react";

export default function useWeeks({
  selectedWeek,
  showWholeSeason,
  setSelectedWeek,
  setShowWholeSeason,
  currentWeekOfTheSeason
}) {
  const [weeks, setWeeks] = useState(
    Array.apply(null, Array(currentWeekOfTheSeason))
  );

  const getWeekButtonStyle = (index) => {
    return index === selectedWeek && !showWholeSeason ? "current--week" : "";
  };

  const handleWeekClick = (index) => {
    setSelectedWeek(index);
    setShowWholeSeason(false);
  };

  useEffect(() => {
    setWeeks(Array.apply(null, Array(currentWeekOfTheSeason)));
  }, [currentWeekOfTheSeason]);

  useEffect(() => {
    const renderWeeks = () => {
      setWeeks((prevWeeks) =>
        prevWeeks
          .map((_, index) => (
            <button
              className={"" + getWeekButtonStyle(index + 1)}
              onClick={() => handleWeekClick(index + 1)}
              key={index}
            >
              <p className={"nav-btn-tag " + getWeekButtonStyle(index + 1)}>
                week
              </p>
              {index + 1}
            </button>
          ))
          .reverse()
      );
    };
    renderWeeks();
  }, [selectedWeek, showWholeSeason, currentWeekOfTheSeason]);

  return { weeks };
}
