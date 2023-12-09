import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import { calculateRace } from "../../utility/calculateRace";
import Season from "./Season";
import Week from "./Week";
import MobileWeek from "./MobileWeek";
import { isInMobileView } from "@/utility/views";
import { useEffect, useState } from "react";
import MobileSeason from "./MobileSeason";

const PlayerCard = ({ player, id, week, selectedWeek, showWholeSeason }) => {
  const [showMobile, setShowMobile] = useState(false);

  const toggleMobileWeek = () => {
    if (isInMobileView()) {
      setShowMobile((prevState) => !prevState);
    }
  };

  const hideMobileWeek = () => {
    if (!isInMobileView()) setShowMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", hideMobileWeek);

    return () => window.removeEventListener("resize", hideMobileWeek);
  }, []);

  return (
    <>
      <h3 className="rank table--element">{id}</h3>
      <div>
        <h3 className="name table--element" onClick={toggleMobileWeek}>
          {player.name}{" "}
        </h3>
      </div>
      <h3 className="table--element mmr">{player.mmr}</h3>
      <h3 className={"race table--element " + calculateRace(player.race)}>
        {calculateRace(player.race)}
      </h3>
      {showWholeSeason && <Season player={player} week={week} />}
      {showWholeSeason && (
        <h3 className="matches table--element">{player.matches.length}</h3>
      )}
      {!showWholeSeason && (
        <Week player={player} week={week} selectedWeek={selectedWeek} />
      )}
      {!showWholeSeason && (
        <h3 className="matches table--element">
          {getNumberOfMatchesAWeek(player.matches, selectedWeek)}
        </h3>
      )}
      {isInMobileView() && !showWholeSeason && (
        <section className={`mobile-week ${showMobile ? "" : "hidden"}`}>
          <MobileWeek player={player} selectedWeek={selectedWeek} />
        </section>
      )}
      {isInMobileView() && showWholeSeason && (
        <section className={`mobile-season ${showMobile ? "" : "hidden"}`}>
          <MobileSeason player={player} week={week} />
        </section>
      )}
    </>
  );
};

export default PlayerCard;
