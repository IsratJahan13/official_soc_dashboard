import React from "react";

const LogTimeFilter = ({ selectedTimeRange, onTimeRangeChange }) => {
  return (
    <div>
      <label htmlFor="timeRange">Valitse ajanjakso:</label>
      <select
        id="timeRange"
        value={selectedTimeRange}
        onChange={onTimeRangeChange}
      >
        <option value="hour">Viimeinen tunti</option>
        <option value="day">Viimeinen vuorokausi</option>
        <option value="week">Viimeinen viikko</option>
        <option value="all">Kaikki lokit</option>
      </select>
    </div>
  );
};

export default LogTimeFilter;
