import React, { useEffect, useState } from "react";
import darkmodeIcon from "../assets/darkmode.svg";
import brightmodeIcon from "../assets/brightmode.svg";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? "#000"
      : "rgba(252, 224, 209, 1)";

    const graphsSection = document.querySelector(".graphs-section");
    if (graphsSection) {
      graphsSection.classList.toggle("graphs-sectionDark", darkMode);
    }

    const chartLogSections = document.querySelectorAll(".chartLogSection");
    if (chartLogSections) {
      chartLogSections.forEach((chartLogSection) => {
        chartLogSection.classList.toggle("chartLogSectionDark", darkMode);
      });
    }

    const graphs = document.querySelectorAll(
      ".Graph1, .Graph2, .Graph3, .Graph4"
    );
    if (graphs) {
      graphs.forEach((graph) => {
        graph.classList.toggle(
          "Graph1Dark",
          darkMode && graph.classList.contains("Graph1")
        );
        graph.classList.toggle(
          "Graph2Dark",
          darkMode && graph.classList.contains("Graph2")
        );
        graph.classList.toggle(
          "Graph3Dark",
          darkMode && graph.classList.contains("Graph3")
        );
        graph.classList.toggle(
          "Graph4Dark",
          darkMode && graph.classList.contains("Graph4")
        );
      });
    }

    const tableHeaders = document.querySelectorAll("th");
    if (tableHeaders) {
      tableHeaders.forEach((th) => {
        th.classList.toggle("thDark", darkMode);
      });
    }

    const tableData = document.querySelectorAll("td");
    if (tableData) {
      tableData.forEach((td) => {
        td.classList.toggle("tdDark", darkMode);
      });
    }

    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("headerDark", darkMode);
    }

    const totals = document.querySelectorAll(".eventTotal");
    totals.forEach((total) => {
      total.classList.toggle("eventTotalDark", darkMode);
    });
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
