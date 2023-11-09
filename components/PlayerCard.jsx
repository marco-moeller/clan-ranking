import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import { calculateRace } from "../utility/calculateRace";
import Season from "./Season";
import Week from "./Week";

const PlayerCard = ({ player, id, week, selectedWeek, showWholeSeason }) => {
  return (
    <>
      <h3 className="rank table--element">{id}</h3>
      <h3 className="name table--element">{player.name}</h3>
      <h3 className="table--element mmr">{player.mmr}</h3>
      <h3 className={"race table--element " + calculateRace(player.race)}>
        {calculateRace(player.race)}
      </h3>
      {showWholeSeason && <Season player={player} week={week} />}
      {!showWholeSeason && (
        <Week player={player} week={week} selectedWeek={selectedWeek} />
      )}
      {showWholeSeason && (
        <h3 className="matches table--element">{player.matches.length}</h3>
      )}
      {!showWholeSeason && (
        <h3 className="matches table--element">
          {getNumberOfMatchesAWeek(player.matches, selectedWeek)}
        </h3>
      )}
    </>
  );
};

export default PlayerCard;
