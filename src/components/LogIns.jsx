import React, { useEffect, useState } from "react";
import dataService from "../services/Data";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Filter from "./Filter";

const LogIns = () => {
  const [selectedView, setSelectedView] = useState("day");
  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await dataService.getAllData("/tyoasema");
        const response2 = await dataService.getAllData("/palvelin");
        const response = [...response1.data, ...response2.data];
        const currentTime = new Date();
        let startTime;

        switch (selectedView) {
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
          default:
            startTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
        }

        const filtered = response.filter(
          (entry) => new Date(entry.timestamp) >= startTime
        );
        setFilteredData(filtered);
        setTotal(filtered.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotal(0);
      }
    };

    fetchData();
  }, [selectedView]);

  const processDataForChart = () => {
    let successfulLogins_tyoAsema = 0;
    let failedLogins_tyoAsema = 0;
    let successfulLogins_palvelin = 0;
    let failedLogins_palvelin = 0;

    if (filteredData && filteredData.length > 0) {
      const currentTime = new Date();

      if (selectedView === "hour") {
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

        filteredData.forEach((entry) => {
          const entryTime = new Date(entry.timestamp);
          if (entryTime >= oneHourAgo && entryTime <= currentTime) {
            if (entry.logon_result === "Success") {
              successfulLogins_tyoAsema++;
            } else if (entry.logon_result === "Failure") {
              failedLogins_tyoAsema++;
            } else if (
              entry.event_type === "login" &&
              entry.status === "success"
            ) {
              successfulLogins_palvelin++;
            } else if (
              entry.event_type === "login" &&
              entry.status === "failed"
            ) {
              failedLogins_palvelin++;
            }
          }
        });
      } else {
        filteredData.forEach((entry) => {
          const entryTime = new Date(entry.timestamp);
          if (selectedView === "day") {
            const oneDayAgo = new Date(
              currentTime.getTime() - 24 * 60 * 60 * 1000
            );
            if (entryTime >= oneDayAgo && entryTime <= currentTime) {
              if (entry.logon_result === "Success") {
                successfulLogins_tyoAsema++;
              } else if (entry.logon_result === "Failure") {
                failedLogins_tyoAsema++;
              } else if (
                entry.event_type === "login" &&
                entry.status === "success"
              ) {
                successfulLogins_palvelin++;
              } else if (
                entry.event_type === "login" &&
                entry.status === "failed"
              ) {
                failedLogins_palvelin++;
              }
            }
          } else if (selectedView === "week") {
            const oneWeekAgo = new Date(
              currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            if (entryTime >= oneWeekAgo && entryTime <= currentTime) {
              if (entry.logon_result === "Success") {
                successfulLogins_tyoAsema++;
              } else if (entry.logon_result === "Failure") {
                failedLogins_tyoAsema++;
              } else if (
                entry.event_type === "login" &&
                entry.status === "success"
              ) {
                successfulLogins_palvelin++;
              } else if (
                entry.event_type === "login" &&
                entry.status === "failed"
              ) {
                failedLogins_palvelin++;
              }
            }
          }
        });
      }
    }

    const chartData = {
      labels: ["Työasema", "Palvelin"],
      datasets: [
        {
          label: "Onnistuneet",
          backgroundColor: "#779643",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [successfulLogins_tyoAsema, successfulLogins_palvelin],
        },
        {
          label: "Epäonnistuneet",
          backgroundColor: "#DD4544",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [failedLogins_tyoAsema, failedLogins_palvelin],
        },
      ],
    };

    return chartData;
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Kirjautumisten määrä (kpl)",
          font: {
            weight: "bold",
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const handleViewSelect = (view) => {
    setSelectedView(view);
  };

  const chartData = processDataForChart();

  return (
    <div className="Graph1">
      <h2>
        Sisäänkirjautumiset{" "}
        {selectedView === "hour"
          ? "viimeisen tunnin"
          : selectedView === "day"
          ? "viimeisen vuorokauden"
          : "viimeisen viikon"}{" "}
        aikana
      </h2>
      <Bar data={chartData} options={options} />
      <section className="chartLogSection">
        <Filter
          selectedView={selectedView}
          onSelect={handleViewSelect}
          total={total}
        />
      </section>
    </div>
  );
};

export default LogIns;
