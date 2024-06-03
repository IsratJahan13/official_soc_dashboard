import React, { useState, useEffect } from "react";
import dataService from "../services/Data";
import LogTimeFilter from "./LogTimeFilter";

const RouterLogs = () => {
  const [serverLogs, setServerLogs] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataService.getAllData("/reititin");
        const currentTime = new Date();
        let startTime;

        switch (selectedTimeRange) {
          case "hour":
            startTime = new Date(currentTime.getTime() - 60 * 60 * 1000);
            break;
          case "day":
            startTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
            break;
          case "week":
            startTime = new Date(
              currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            break;
          case "all":
            startTime = new Date(0);
            break;
          default:
            startTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
        }

        const filteredLogs = response.data.filter(
          (log) => new Date(log.timestamp) >= startTime
        );

        setServerLogs(filteredLogs);
      } catch (error) {
        console.error("Error fetching router logs:", error);
      }
    };

    fetchData();
  }, [selectedTimeRange]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("fi-FI");
    const formattedTime = date.toLocaleTimeString("fi-FI", { hour12: false });
    return (
      <>
        {formattedDate}
        <br />
        klo {formattedTime}
      </>
    );
  };

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
  };

  return (
    <div>
      <h3>Reitittimen lokit</h3>
      <LogTimeFilter
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />
      <table>
        <thead>
          <tr>
            <th>Aika</th>
            <th>Lähde IP</th>
            <th>Kohde IP</th>
            <th>Kohde portti</th>
            <th>Protokolla</th>
            <th>Toiminta</th>
            <th>Hyökkäystyyppi</th>
            <th>Hyökkäysliikenne</th>
          </tr>
        </thead>
        <tbody>
          {serverLogs.map((log, index) => (
            <tr key={index}>
              <td>{formatDateTime(log.timestamp)}</td>
              <td>{log.source_ip}</td>
              <td>{log.destination_ip}</td>
              <td>{log.destination_port}</td>
              <td>{log.protocol}</td>
              <td>{log.action}</td>
              <td>{log.attack_type}</td>
              <td>{log.attack_traffic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouterLogs;
