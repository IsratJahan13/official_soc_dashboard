import React, { useEffect, useState } from "react";
import dataService from "../services/Data"; // Import data service
import { Doughnut } from "react-chartjs-2"; // Import Pie component from React Chart.js library
import Filter from "./Filter"; // Import Filter component

const DeviationsFromNormalBehavior = () => {
  // Define state variables
  const [selectedView, setSelectedView] = useState("day"); // Defines the selected view (hour or day)
  const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array

  // Fetch data on initial render and whenever the selected view changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const response = await dataService.getAllData("/tyoasema");
        console.log(response.data);
        const currentTime = new Date();
        let startTime;

        // Set start time based on the selected view
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

        // Filter data for the last hour
        const filtered = response.data.filter(
          (entry) => new Date(entry.timestamp) >= startTime
        );
        // Set the filtered data
        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching data:", error); // Log error if data fetching fails
      }
    };

    fetchData(); // Call the fetchData function
  }, [selectedView]); // Depend on selectedView changes only

  // Process filtered data for the chart
  const processDataForChart = () => {
    let normal = 0;
    let attacker = 0;
    let failure = 0;

    if (filteredData && filteredData.length > 0) {
      const currentTime = new Date();

      // If the view is "hour", process data for the last hour only
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
        // Process data for other views (day, week) according to the original logic
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

    // Prepare data object for the pie chart
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

    return chartData; // Return chart data
  };

  // Set options for the chart
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

  // Get chart data using processDataForChart function
  const chartData = processDataForChart();

  return (
    <div className="Graph2">
      <h2>
        Verkkoliikenteen käyttäytyminen{" "}
        {selectedView === "hour"
          ? "viimeisen tunnin"
          : selectedView === "day"
          ? "viimeisen vuorokauden"
          : "viimeisen viikon"}{" "}
        aikana
      </h2>
      <Doughnut data={chartData} options={options} />
      <section className="chartLogSection">
        <Filter selectedView={selectedView} onSelect={handleViewSelect} />
      </section>
    </div>
  );
};

export default DeviationsFromNormalBehavior;
