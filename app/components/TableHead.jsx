import {
  getNumberOfMatchesADay,
  getNumberOfMatchesAWeek
} from "@/utility/matchesCounting";
import {
  getMmrDifference,
  getPrevWeekMmr,
  getWeekEndMmr
} from "@/utility/mmrCalculation";
import { useEffect } from "react";
import _ from "lodash";
import { RiExpandUpDownLine } from "react-icons/ri";

const TableHead = ({ showWholeSeason, setPlayers, weeks, selectedWeek }) => {
  const sortBy = (property) => {
    setPlayers((prevPlayers) => _.sortBy(prevPlayers, [property]).reverse());
  };

  const sortByMatchesAWeek = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getNumberOfMatchesAWeek(b.matches, selectedWeek) -
          getNumberOfMatchesAWeek(a.matches, selectedWeek)
      )
    ]);
  };

  const sortByMatchesADay = (day) => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getNumberOfMatchesADay(b.matches, selectedWeek, day) -
          getNumberOfMatchesADay(a.matches, selectedWeek, day)
      )
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
      )
    ]);
  };

  const sortByStartMmr = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getPrevWeekMmr(selectedWeek, b) - getPrevWeekMmr(selectedWeek, a)
      )
    ]);
  };

  const sortByEndMmr = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort(
        (a, b) =>
          getWeekEndMmr(selectedWeek, b) - getWeekEndMmr(selectedWeek, a)
      )
    ]);
  };

  const sortByName = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers.sort((a, b) => a.name.localeCompare(b.name))
    ]);
  };

  useEffect(() => {
    showWholeSeason ? sortBy("matches.length") : sortByMatchesAWeek();
  }, [selectedWeek, showWholeSeason]);

  return (
    <section className="table-head">
      <h2 className="sort-btn  " onClick={() => sortBy("mmr")}>
        MMR
        <RiExpandUpDownLine />
      </h2>
      <h2 className="sort-btn " onClick={() => sortBy("race")}>
        Race
        <RiExpandUpDownLine />
      </h2>

      {!showWholeSeason && (
        <h2 className="sort-btn " onClick={sortByMmrDifference}>
          MMR Gain
          <RiExpandUpDownLine />
        </h2>
      )}

      <h2
        className="sort-btn "
        onClick={() => {
          showWholeSeason ? sortBy("matches.length") : sortByMatchesAWeek();
        }}
      >
        Games
        <RiExpandUpDownLine />
      </h2>
    </section>
  );
};

export default TableHead;
