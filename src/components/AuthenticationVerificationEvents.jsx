import React, { useEffect, useState } from "react";
import dataService from "../services/Data";
import { Bar } from "react-chartjs-2";
import Filter from "./Filter";

const AuthenticationVerificationEvents = () => {
  const [selectedView, setSelectedView] = useState("day");
  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await dataService.getAllData("/tyoasema");
        const response2 = await dataService.getAllData("/reititin");
        const response3 = await dataService.getAllData("/palvelin");

        const response = [
          ...response1.data,
          ...response2.data,
          ...response3.data,
        ];

        console.log(response.data);
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
    let serverLogIns = 0;
    let serverFailedLogIns = 0;
    let serverUpdates = 0;
    let serverAbnormalActivity = 0;
    let routerActionsVerified = 0;
    let routerActionsBlockedDenied = 0;
    let workStationInterActiveLogIns = 0;
    let workStationLogIns = 0;

    if (filteredData && filteredData.length > 0) {
      const currentTime = new Date();

      if (selectedView === "hour") {
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

        filteredData.forEach((entry) => {
          const entryTime = new Date(entry.timestamp);
          if (entryTime >= oneHourAgo && entryTime <= currentTime) {
            if (entry.event_type === "login" && entry.status === "success") {
              serverLogIns++;
            } else if (
              entry.event_type === "login" &&
              entry.status === "failed"
            ) {
              serverFailedLogIns++;
            } else if (
              entry.event_type === "update" &&
              entry.status === "success"
            ) {
              serverUpdates++;
            } else if (entry.event_type === "abnormal_activity") {
              serverAbnormalActivity++;
            } else if (
              entry.action === "forwarded" &&
              (entry.protocol === "SSH" || entry.protocol === "HTTPS")
            ) {
              routerActionsVerified++;
            } else if (
              entry.action === "blocked" ||
              entry.action === "denied"
            ) {
              routerActionsBlockedDenied++;
            } else if (
              entry.logon_type === "Interactive" &&
              entry.logon_result === "Success"
            ) {
              workStationInterActiveLogIns++;
            } else if (entry.logon_result === "Success") {
              workStationLogIns++;
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
              if (entry.event_type === "login" && entry.status === "success") {
                serverLogIns++;
              } else if (
                entry.event_type === "login" &&
                entry.status === "failed"
              ) {
                serverFailedLogIns++;
              } else if (
                entry.event_type === "update" &&
                entry.status === "success"
              ) {
                serverUpdates++;
              } else if (entry.event_type === "abnormal_activity") {
                serverAbnormalActivity++;
              } else if (
                entry.action === "forwarded" &&
                (entry.protocol === "SSH" || entry.protocol === "HTTPS")
              ) {
                routerActionsVerified++;
              } else if (
                entry.action === "blocked" ||
                entry.action === "denied"
              ) {
                routerActionsBlockedDenied++;
              } else if (
                entry.logon_type === "Interactive" &&
                entry.logon_result === "Success"
              ) {
                workStationInterActiveLogIns++;
              } else if (entry.logon_result === "Success") {
                workStationLogIns++;
              }
            }
          } else if (selectedView === "week") {
            const oneWeekAgo = new Date(
              currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            if (entryTime >= oneWeekAgo && entryTime <= currentTime) {
              if (entry.event_type === "login" && entry.status === "success") {
                serverLogIns++;
              } else if (
                entry.event_type === "login" &&
                entry.status === "failed"
              ) {
                serverFailedLogIns++;
              } else if (
                entry.event_type === "update" &&
                entry.status === "success"
              ) {
                serverUpdates++;
              } else if (entry.event_type === "abnormal_activity") {
                serverAbnormalActivity++;
              } else if (
                entry.action === "forwarded" &&
                (entry.protocol === "SSH" || entry.protocol === "HTTPS")
              ) {
                routerActionsVerified++;
              } else if (
                entry.action === "blocked" ||
                entry.action === "denied"
              ) {
                routerActionsBlockedDenied++;
              } else if (
                entry.logon_type === "Interactive" &&
                entry.logon_result === "Success"
              ) {
                workStationInterActiveLogIns++;
              } else if (entry.logon_result === "Success") {
                workStationLogIns++;
              }
            }
          }
        });
      }
    }

    const chartData = {
      labels: ["Palvelin", "Reititin", "Työasema"],
      datasets: [
        {
          label: "Onnistuneet sisäänkirjautumiset",
          backgroundColor: "#779643",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [serverLogIns, 0, 0],
        },
        {
          label: "Epäonnistuneet sisäänkirjautumiset",
          backgroundColor: "#dd4545",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [serverFailedLogIns, 0, 0],
        },
        {
          label: "Päivitykset",
          backgroundColor: "#ddd845",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [serverUpdates, 0, 0],
        },
        {
          label: "Epätavallinen toiminta",
          backgroundColor: "#b68d3a",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [serverAbnormalActivity, 0, 0],
        },
        {
          label: "Varmennetut tapahtumat",
          backgroundColor: "#779643",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [0, routerActionsVerified, 0],
        },
        {
          label: "Estetyt tapahtumat",
          backgroundColor: "#dd4545",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [0, routerActionsBlockedDenied, 0],
        },
        {
          label: "Hyväksytyt interaktiiviset sisäänkirjautumiset",
          backgroundColor: "#779643",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [0, 0, workStationInterActiveLogIns],
        },
        {
          label: "Sisäänkirjautumiset",
          backgroundColor: "#a7c379",
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [0, 0, workStationLogIns],
        },
      ],
    };
    return chartData;
  };

  const options = {
    indexAxis: "y",
    scales: {
      y: {
        title: {
          display: true,
          text: "Tapahtumien määrät (kpl)",
          font: {
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleViewSelect = (view) => {
    setSelectedView(view);
  };

  const chartData = processDataForChart();

  return (
    <div className="Graph4">
      <h2>
        Tunnistautumis- ja varmennustapahtumat{" "}
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

export default AuthenticationVerificationEvents;
