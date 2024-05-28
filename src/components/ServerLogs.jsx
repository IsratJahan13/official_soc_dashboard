import React, { useState, useEffect } from "react";
import dataService from "../services/Data";

const ServerLogs = () => {
  const [serverLogs, setServerLogs] = useState([]);

  useEffect(() => {
    dataService
      .getAllData("/palvelin")
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
      <h3>Palvelinlokit</h3>
      <table>
        <thead>
          <tr>
            <th>Aika</th>
            <th>Palvelin</th>
            <th>Tapahtuma</th>
            <th>Käyttäjä/Päivitys</th>
            <th>Tilanne</th>
            <th>Kuvaus</th>
          </tr>
        </thead>
        <tbody>
          {serverLogs.map((log, index) => (
            <tr key={index}>
              <td>{formatDateTime(log.timestamp)}</td>
              <td>{log.server_name}</td>
              <td>{log.event_type}</td>
              <td>{log.username || log.update_name}</td>
              <td>{log.status}</td>
              <td>{log.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServerLogs;
