import React, { useEffect, useState } from "react";
import dataService from "../services/Data";
import { Doughnut } from "react-chartjs-2";
import Filter from "./Filter";

const DeviationsFromNormalBehavior = () => {
  const [selectedView, setSelectedView] = useState("day");
  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataService.getAllData("/tyoasema");
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

        const filtered = response.data.filter(
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
    let normal = 0;
    let attacker = 0;
    let failure = 0;

    if (filteredData && filteredData.length > 0) {
      const currentTime = new Date();

      if (selectedView === "hour") {
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

        filteredData.forEach((entry) => {
          const entryTime = new Date(entry.timestamp);
          if (entryTime >= oneHourAgo && entryTime <= currentTime) {
            if (entry.username === "attacker") {
              attacker++;
            } else if (
              entry.logon_type === "Interactive" &&
              entry.logon_result === "Success"
            ) {
              normal++;
            } else if (entry.logon_result === "Failure") {
              failure++;
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
              if (entry.username === "attacker") {
                attacker++;
              } else if (
                entry.logon_type === "Interactive" &&
                entry.logon_result === "Success"
              ) {
                normal++;
              } else if (entry.logon_result === "Failure") {
                failure++;
              }
            }
          } else if (selectedView === "week") {
            const oneWeekAgo = new Date(
              currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            if (entryTime >= oneWeekAgo && entryTime <= currentTime) {
              if (entry.username === "attacker") {
                attacker++;
              } else if (
                entry.logon_type === "Interactive" &&
                entry.logon_result === "Success"
              ) {
                normal++;
              } else if (entry.logon_result === "Failure") {
                failure++;
              }
            }
          }
        });
      }
    }

    const chartData = {
      labels: ["Normaalit", "Epäonnistuneet", "Hyökkäystapahtuma"],
      datasets: [
        {
          label: "Verkkoliikenteen käyttäytyminen",
          backgroundColor: ["#769643", "#ddd845", "#dd4545"],
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [normal, failure, attacker],
        },
      ],
    };

    return chartData;
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  const handleViewSelect = (view) => {
    setSelectedView(view);
  };

  const chartData = processDataForChart();

  return (
    <div className="Graph2">
      <h2>
        Työasema: verkkoliikenteen käyttäytyminen{" "}
        {selectedView === "hour"
          ? "viimeisen tunnin"
          : selectedView === "day"
          ? "viimeisen vuorokauden"
          : "viimeisen viikon"}{" "}
        aikana
      </h2>
      <Doughnut data={chartData} options={options} />
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

export default DeviationsFromNormalBehavior;
