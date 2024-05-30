import React, { useState, useEffect } from "react";
import dataService from "../services/Data";

const FirewallLogs = () => {
  const [serverLogs, setServerLogs] = useState([]);

  useEffect(() => {
    dataService
      .getAllData("/palomuuri")
      .then((response) => {
        setServerLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching server logs:", error);
      });
  }, []);

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

  return (
    <div>
      <h3>Palomuurin lokit</h3>
      <table>
        <thead>
          <tr>
            <th>Aika</th>
            <th>Lähde IP</th>
            <th>Kohde IP</th>
            <th>Kohde portti</th>
            <th>Protokolla</th>
            <th>Toiminta</th>
            <th>Kuvaus</th>
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
              <td>{log.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirewallLogs;