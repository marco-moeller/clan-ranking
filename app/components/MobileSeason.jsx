import { getNumberOfMatchesAWeek } from "@/utility/matchesCounting";
import { nanoid } from "nanoid";

const MobileSeason = ({ player, week }) => {
  return (
    <>
      {Array(week)
        .fill(null)
        .map((_, index) => (
          <div key={nanoid()}>
            {/* array index starts with 0 obviously, but our weeks start with week 1 */}
            <h2 className="mobile-season-el">{index + 1}</h2>
            <h3 className="mobile-season-el">
              {getNumberOfMatchesAWeek(player.matches, index + 1)}{" "}
            </h3>
          </div>
        ))}
    </>
  );
};

export default MobileSeason;
