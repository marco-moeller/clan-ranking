import React from "react";

const Navbar = ({ setShowWholeSeason, weeks, season, showWholeSeason }) => {
  return (
    <nav className="buttons--container">
      <button
        className={
          showWholeSeason ? "showall--btn current--week" : " showall--btn"
        }
        onClick={() => setShowWholeSeason(true)}
      >
        <p
          className={
            showWholeSeason ? "current--week nav-btn-tag" : " nav-btn-tag"
          }
        >
          Season
        </p>
        {season}
      </button>
      {weeks}
    </nav>
  );
};

export default Navbar;
