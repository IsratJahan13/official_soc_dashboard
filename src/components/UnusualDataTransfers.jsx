import React, { useEffect, useState } from "react";
import dataService from "../services/Data"; // Import data
import Chart from "chart.js/auto"; // Import Chart.js with automatic version management
import { Pie } from "react-chartjs-2"; // Import Bar component from React Chart.js library
import Filter from "./Filter"; // Import Filter component

const UnusualDataTransfers = () => {
  // Define state variables
  const [selectedView, setSelectedView] = useState("day"); // Defines the selected view
  const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array
  const [total, setTotal] = useState(0);
  // Fetch data on initial render and whenever the selected view changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const response = await dataService.getAllData("/reititin");
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
        setTotal(filtered.length);
      } catch (error) {
        console.error("Error fetching data:", error); // Log error if data fetching fails
        setTotal(0);
      }
    };

    fetchData(); // Call the fetchData function
  }, [selectedView]); // Depend on selectedView changes only

  // Process filtered data for the chart
  const processDataForChart = () => {
    let actionAllowed = 0;
    let actionDenied = 0;
    let actionBlocked = 0;

    if (filteredData && filteredData.length > 0) {
      const currentTime = new Date();

      // If the view is "hour", process data for the last hour only
      if (selectedView === "hour") {
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

        filteredData.forEach((entry) => {
          const entryTime = new Date(entry.timestamp);
          if (entryTime >= oneHourAgo && entryTime <= currentTime) {
            if (entry.action === "allowed" || entry.action === "forwarded") {
              actionAllowed++;
            } else if (entry.action === "denied") {
              actionDenied++;
            } else if (entry.action === "blocked") {
              actionBlocked++;
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
              if (entry.action === "allowed" || entry.action === "forwarded") {
                actionAllowed++;
              } else if (entry.action === "denied") {
                actionDenied++;
              } else if (entry.action === "blocked") {
                actionBlocked++;
              }
            }
          } else if (selectedView === "week") {
            const oneWeekAgo = new Date(
              currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            if (entryTime >= oneWeekAgo && entryTime <= currentTime) {
              if (entry.action === "allowed" || entry.action === "forwarded") {
                actionAllowed++;
              } else if (entry.action === "denied") {
                actionDenied++;
              } else if (entry.action === "blocked") {
                actionBlocked++;
              }
            }
          }
        });
      }
    }

    // Prepare data object for the bar chart
    const chartData = {
      labels: ["Sallitut", "Kielletyt", "Estetyt"],
      datasets: [
        {
          label: "Tietojen siirrot reitittimelle",
          backgroundColor: ["#769643", "#dd4545", "#ddd845"],
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [actionAllowed, actionDenied, actionBlocked],
        },
      ],
    };
    return chartData; // Return chart data
  };

  // Set options for the chart
  const options = {
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  const handleViewSelect = (view) => {
    setSelectedView(view);
  };

  // Get chart data using processDataForChart function
  const chartData = processDataForChart();

  return (
    <div className="Graph3">
      <h2>
        Reititin: tietojen siirrot{" "}
        {selectedView === "hour"
          ? "viimeisen tunnin"
          : selectedView === "day"
          ? "viimeisen vuorokauden"
          : "viimeisen viikon"}{" "}
        aikana
      </h2>
      <Pie data={chartData} options={options} />
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

export default UnusualDataTransfers;
