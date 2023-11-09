import {
  getNumberOfMatchesADay,
  getNumberOfMatchesAWeek,
} from "@/utility/matchesCounting";
import { getDayIndexFromDayString } from "@/utility/matchesHelper";
import {
  getMmrDifference,
  getPrevWeekMmr,
  getWeekEndMmr,
} from "@/utility/mmrCalculation";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import _ from "lodash";

const TableHead = ({
  showWholeSeason,
  setPlayers,
  weeks,
  selectedWeek,
  sortBy,
}) => {
  const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const sortByMatchesAWeek = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getNumberOfMatchesAWeek(b.matches, selectedWeek) -
          getNumberOfMatchesAWeek(a.matches, selectedWeek)
      ),
    ]);
  };

  const sortByMatchesADay = (day) => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getNumberOfMatchesADay(b.matches, selectedWeek, day) -
          getNumberOfMatchesADay(a.matches, selectedWeek, day)
      ),
    ]);
  };

  const sortByMmrDifference = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getMmrDifference(
            getPrevWeekMmr(selectedWeek, b),
            getWeekEndMmr(selectedWeek, b)
          ) -
          getMmrDifference(
            getPrevWeekMmr(selectedWeek, a),
            getWeekEndMmr(selectedWeek, a)
          )
      ),
    ]);
  };

  const sortByStartMmr = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getPrevWeekMmr(selectedWeek, b) - getPrevWeekMmr(selectedWeek, a)
      ),
    ]);
  };

  const sortByEndMmr = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getWeekEndMmr(selectedWeek, b) - getWeekEndMmr(selectedWeek, a)
      ),
    ]);
  };

  const sortByName = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  };

  useEffect(() => {
    showWholeSeason ? sortBy("matches.length") : sortByMatchesAWeek();
  }, [selectedWeek, showWholeSeason]);

  return (
    <>
      <div className="th table--element rank"></div>
      <h2 className="th table--element name" onClick={sortByName}>
        Name
      </h2>
      <h2
        className="th sort-btn table--element mmr"
        onClick={() => sortBy("mmr")}
      >
        MMR
      </h2>
      <h2 className="th table--element race">Race</h2>
      {!showWholeSeason && (
        <h2 className="th table--element start--mmr" onClick={sortByStartMmr}>
          Start MMR
        </h2>
      )}
      {showWholeSeason &&
        weeks.map((_, index) => (
          <h2 className="th matches--a--week" key={nanoid()}>
            {index + 1}
          </h2>
        ))}
      {!showWholeSeason &&
        WEEKDAYS.map((day) => (
          <h2
            className="th weekday"
            key={day}
            onClick={() => sortByMatchesADay(getDayIndexFromDayString(day))}
          >
            {day}
          </h2>
        ))}
      {!showWholeSeason && (
        <h2 className="th end--mmr" onClick={sortByEndMmr}>
          End MMR
        </h2>
      )}
      {!showWholeSeason && (
        <h2 className="th" onClick={sortByMmrDifference}>
          MMR +/-
        </h2>
      )}

      <h2
        className="th sort-btn matches"
        onClick={() => {
          showWholeSeason ? sortBy("matches.length") : sortByMatchesAWeek();
        }}
      >
        #
      </h2>
    </>
  );
};

export default TableHead;
