import React, { useEffect, useState } from "react";
import darkmodeIcon from "../assets/darkmode.svg";
import brightmodeIcon from "../assets/brightmode.svg";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Muuta bodyn taustaväriä tilan mukaan
    document.body.style.backgroundColor = darkMode
      ? "#000"
      : "rgba(252, 224, 209, 1)";

    const graphsSection = document.querySelector(".graphs-section");
    if (graphsSection) {
      graphsSection.style.backgroundColor = darkMode ? "#1d1c1c" : "#fff";
      graphsSection.style.color = darkMode ? "#fff" : "rgb(0, 0, 0)";
      graphsSection.style.border = darkMode
        ? "#fff 1px solid"
        : "1px solid black";
    }

    const chartLogSections = document.querySelectorAll(".chartLogSection");
    chartLogSections.forEach((chartLogSection) => {
      chartLogSection.style.backgroundColor = darkMode
        ? "rgb(77 71 71)"
        : "#fff";
      chartLogSection.style.border = darkMode ? "#fff" : "rgb(0, 0, 0)";
      chartLogSection.style.borderRadius = darkMode ? "10px" : "0";
    });

    const graphs = document.querySelectorAll(
      ".Graph1, .Graph2, .Graph3, .Graph4"
    );
    graphs.forEach((graph) => {
      graph.style.border = darkMode
        ? "0.5px solid rgba(251, 239, 234, 1)"
        : "0.5px solid black";
      graph.style.backgroundColor = darkMode ? "#393333" : "#fff";
    });

    const tablerows = document.querySelectorAll("th");
    tablerows.forEach((th) => {
      th.style.backgroundColor = darkMode ? "#606060" : "#ededed";
    });

    const tabledatas = document.querySelectorAll("td");
    tabledatas.forEach((td) => {
      td.style.backgroundColor = darkMode ? "#424141" : "#fff";
    });

    const header = document.querySelector("header");
    if (header) {
      header.style.backgroundColor = darkMode
        ? "#1d1c1c"
        : "rgba(105, 1, 59, 1)";
      header.style.color = darkMode ? "#fff" : "#000";
      header.style.border = darkMode ? "#fff 1px solid" : "unset";
    }
  }, [darkMode]);

  return (
    <button className="mode-button" onClick={toggleMode}>
      {darkMode ? "Bright mode" : "Dark mode"}
      <span>
        <figure className="mode-frame">
          <img
            className={darkMode ? "brightMode-icon" : "darkMode-icon"}
            src={darkMode ? brightmodeIcon : darkmodeIcon}
            alt={darkMode ? "Brightmode icon" : "Darkmode icon"}
          />
        </figure>
      </span>
    </button>
  );
};

export default DarkModeToggle;
