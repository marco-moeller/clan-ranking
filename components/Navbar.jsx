import React from "react";

const Navbar = ({ setShowWholeSeason, weeks, season, showWholeSeason }) => {
  return (
    <nav className="buttons--container">
      <button
        className={
          showWholeSeason
            ? "week showall--btn current--week"
            : "week showall--btn"
        }
        onClick={() => setShowWholeSeason(true)}
      >
        Season {season}
      </button>
      {weeks}
    </nav>
  );
};

export default Navbar;
