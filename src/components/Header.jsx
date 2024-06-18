import React from "react";
import bcLogo from "../assets/BC-logo.png";
import DarkModeToggle from "./DarkModeToggle";
import exitIcon from "../assets/exit.svg";

const Header = () => {
  return (
    <header>
      <div>
        <figure className="bc-logo-frame">
          <img src={bcLogo} className="bc-logo" alt="BC logo" />
        </figure>
      </div>
      <h1>SOC DASHBOARD</h1>
      <div className="toggle-container">
        <button className="exit-button">
          <span>
            <figure className="mode-frame">
              <img className="exit-icon" src={exitIcon}></img>
            </figure>
          </span>
          Exit
        </button>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
