import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import { calculateRace } from "../../utility/calculateRace";
import Season from "./Season";
import Week from "./Week";
import { isInMobileView } from "@/utility/views";
import { useState } from "react";

const PlayerCard = ({ player, id, week, selectedWeek, showWholeSeason }) => {
  const [showMobile, setShowMobile] = useState(false);

  const toggleMobileWeek = () => {
    if (isInMobileView()) {
      setShowMobile((prevState) => !prevState);
    }
  };

  return (
    <section
      className={`player-card ${id <= 3 ? "top-3" : ""} ${
        player.matches.length === 0 ? "grey" : ""
      } `}
      style={{
        backgroundImage: `url("${calculateRace(
          player.race
        ).toLowerCase()}_mirror_bg.png"),url("${calculateRace(
          player.race
        ).toLowerCase()}_bg.png")`
      }}
    >
      {" "}
      <div className="name">
        <a
          href={
            isInMobileView()
              ? "javascript:void(0)"
              : "https://w3champions.com/player/" +
                player.name +
                "%23" +
                player.id
          }
          className="name"
          onClick={toggleMobileWeek}
          target={isInMobileView() ? "" : "_blank"}
        >
          {player.name}{" "}
        </a>
      </div>
      {!showWholeSeason && (
        <>
          <div className="player-card-content week--content">
            <p className="matches ">
              <span className="games-tag">Games</span>
              {getNumberOfMatchesAWeek(player.matches, selectedWeek)}
            </p>
            <p className="mmr">
              <span className="mmr-tag">MMR</span>
              {player.mmr}
            </p>
          </div>
          <div className="player-card-right-side">
            <Week player={player} week={week} selectedWeek={selectedWeek} />
          </div>
        </>
      )}
      {showWholeSeason && (
        <>
          <div className="player-card-content season--content">
            <p className="matches">
              <span className="games-tag">Games</span>

              {player.matches.length}
            </p>

            <p className="mmr">
              <span className="mmr-tag">MMR</span>
              {player.mmr}
            </p>
          </div>
          <div className="player-card-right-side">
            <Season player={player} week={week} />
          </div>
        </>
      )}
    </section>
  );
};

export default PlayerCard;
