import React from "react";

const Filter = ({ selectedView, onSelect }) => {
  return (
    <section className="optionsSection">
      <ul>
        <li>
          <button
            onClick={() => onSelect("hour")}
            className={`optionButtons ${
              selectedView === "hour" ? "selected" : ""
            }`}
          >
            Viimeisen tunnin aikana
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("day")}
            className={`optionButtons ${
              selectedView === "hour" ? "selected" : ""
            }`}
          >
            Päivän aikana
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("week")}
            className={`optionButtons ${
              selectedView === "week" ? "selected" : ""
            }`}
          >
            Viimeisen viikon aikana
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Filter;
