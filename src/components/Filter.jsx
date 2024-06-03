import React from "react";

const Filter = ({ selectedView, onSelect, total }) => {
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
            Viimeisen vuorokauden aikana
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
      <div className="eventTotal">
        <p className="eventTotalP">Tapahtumien määrä yhteensä:</p>
        {total}
      </div>
    </section>
  );
};

export default Filter;
