import React, { useEffect, useState } from "react";
import darkmodeIcon from "../assets/darkmode.svg";
import brightmodeIcon from "../assets/brightmode.svg";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const toggleMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
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

// useEffect(() => {
//   if (darkMode) {
//     document.documentElement.setAttribute("data-theme", "dark");
//   } else {
//     document.documentElement.removeAttribute("data-theme");
//   }
// }, [darkMode]);

// :root {
//   --background-color: rgba(252, 224, 209, 1);
//   --text-color: #000;
// }

// [data-theme="dark"] {
//   --background-color: #000;
//   --text-color: #fff;
// }

// body {
//   background-color: var(--background-color);
//   color: var(--text-color);
// }
/* Esimerkki: Lisää muita teema-tyylejä */
// .graphs-section {
// }

// [data-theme="dark"] .graphs-section {
// }

// .chartLogSection {
// }

// [data-theme="dark"] .chartLogSection {
// }
// .graphs-section {
// }

// [data-theme="dark"] .graphs-section {
// }

// .chartLogSection {
// }

// [data-theme="dark"] .chartLogSection {
// }
