import React from "react";
import bcLogo from "../assets/BC-logo.png";
import DarkModeToggle from "./DarkModeToggle";

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
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
