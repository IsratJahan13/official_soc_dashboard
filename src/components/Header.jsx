import React from "react";
import bcLogo from "../assets/BC-logo.png";
import darkmodeIcon from "../assets/darkmode.svg";

const Header = () => {
  return (
    <header>
      <figure className="bc-logo-frame">
        <img src={bcLogo} className="bc-logo" alt="BC logo"></img>
      </figure>
      <h1>SOC Dashboard</h1>
      <button className="mode-button">
        Dark mode
        <span>
          <figure className="mode-frame">
            <img className="darkmode-icon" src={darkmodeIcon}></img>
          </figure>
        </span>
      </button>
    </header>
  );
};

export default Header;
