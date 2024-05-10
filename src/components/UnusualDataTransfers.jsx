import React, { useEffect, useState } from "react";
import dataService from "../services/Data"; // Import data service
import Chart from "chart.js/auto"; // Import Chart.js with automatic version management
import { Pie } from "react-chartjs-2"; // Import Bar component from React Chart.js library
import Filter from "./Filter"; // Import Filter component

const UnusualDataTransfers = () => {
  // Define state variables
  const [selectedView, setSelectedView] = useState("hour"); // Defines the selected view (hour or day)
  const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array

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
            startTime = new Date(currentTime.getTime() - 60 * 60 * 1000);
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
    let actionAllowed = 0;
    let actionDenied = 0;
    let actionBlocked = 0;
    let actionTypeDDoS = 0;

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
              if (entry.attack_type === "DDoS") {
                actionTypeDDoS++;
              }
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
                if (entry.attack_type === "DDoS") {
                  actionTypeDDoS++;
                }
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
                if (entry.attack_type === "DDoS") {
                  actionTypeDDoS++;
                }
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
      labels: [
        "Sallitut",
        "Kielletyt",
        "Palvelunestohyökkäykset/kielletyt",
        "Estetyt",
      ],
      datasets: [
        {
          label: "Tietojen siirrot reitittimelle",
          backgroundColor: ["#769643", "#dd4545", "#b68d3a", "#ddd845"],
          borderColor: ["rgba(105, 1, 59, 1)"],
          borderWidth: 5,
          data: [
            actionAllowed,
            actionDenied - actionTypeDDoS, // Ei sisällä DDoS-määrää
            actionTypeDDoS, // DDoS-määrä erillisenä lohkona
            actionBlocked,
          ],
        },
      ],
    };
    return chartData; // Return chart data
  };

  // Set options for the chart
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Tiedon siirtojen määrä (kpl)",
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

  // Get chart data using processDataForChart function
  const chartData = processDataForChart();

  return (
    <div className="Graph3">
      <h2>
        Tietojen siirrot{" "}
        {selectedView === "hour"
          ? "viimeisen tunnin"
          : selectedView === "day"
          ? "viimeisen vuorokauden"
          : "viimeisen viikon"}{" "}
        aikana
      </h2>
      <Pie data={chartData} options={options} />
      <section className="chartLogSection">
        <button className="logButton">Tarkastle lokeja</button>
        <Filter selectedView={selectedView} onSelect={handleViewSelect} />
      </section>
    </div>
  );
};

export default UnusualDataTransfers;

// This method works too:
// import React, { useEffect, useState } from "react";
// import dataService from "../services/Data"; // Import data service
// import Chart from "chart.js/auto"; // Import Chart.js with automatic version management
// import { Bar } from "react-chartjs-2"; // Import Bar component from React Chart.js library
// import Filter from "./Filter"; // Import Filter component

// const UnusualDataTransfer = () => {
//   // Define state variables
//   const [selectedView, setSelectedView] = useState("hour"); // Defines the selected view (hour or day)
//   const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array

//   // Fetch data on initial render and whenever the selected view changes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from the server
//         const response = await dataService.getAllData("/reititin");
//         console.log(response.data);
//         const currentTime = new Date();
//         let startTime;

//         // Set start time based on the selected view
//         switch (selectedView) {
//           case "hour":
//             startTime = new Date(currentTime.getTime() - 60 * 60 * 1000);
//             break;
//           case "day":
//             startTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
//             break;
//           case "week":
//             startTime = new Date(
//               currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
//             );
//             break;
//           default:
//             startTime = new Date(currentTime.getTime() - 60 * 60 * 1000);
//         }

//         // Filter data for the last hour
//         const filtered = response.data.filter(
//           (entry) => new Date(entry.timestamp) >= startTime
//         );
//         // Set the filtered data
//         setFilteredData(filtered);
//       } catch (error) {
//         console.error("Error fetching data:", error); // Log error if data fetching fails
//       }
//     };

//     fetchData(); // Call the fetchData function
//   }, [selectedView]); // Depend on selectedView changes only

//   // Process filtered data for the chart
//   const processDataForChart = () => {
//     const counts = {
//       actionAllowed: 0,
//       actionDenied: 0,
//       actionBlocked: 0,
//       actionTypeDanger: 0,
//     };

//     if (filteredData && filteredData.length > 0) {
//       const currentTime = new Date();
//       const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

//       filteredData.forEach((entry) => {
//         const entryTime = new Date(entry.timestamp);
//         if (entryTime >= oneHourAgo && entryTime <= currentTime) {
//           switch (entry.action) {
//             case "allowed":
//             case "forwarded":
//               counts.actionAllowed++;
//               break;
//             case "denied":
//               counts.actionDenied++;
//               break;
//             case "blocked":
//               counts.actionBlocked++;
//               break;
//           }
//           if (
//             (entry.action === "allowed" || entry.action === "forwarded") &&
//             (entry.attack_type !== null || entry.attack_traffic !== null)
//           ) {
//             counts.actionTypeDanger++;
//           }
//         }
//       });
//     }

//     return counts;
//   };

//   // Set options for the chart
//   const options = {
//     scales: {
//       y: {
//         title: {
//           display: true,
//           text: "Tiedon siirtojen määrä (kpl)",
//           font: {
//             weight: "bold",
//           },
//         },
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false, // Takes the legend off (on top of scale)
//       },
//     },
//   };

//   const handleViewSelect = (view) => {
//     setSelectedView(view);
//   };

//   // Get chart data using processDataForChart function
//   const chartData = processDataForChart();

//   return (
//     <div>
//       <h2>
//         Tietojen siirrot{" "}
//         {selectedView === "hour"
//           ? "viimeisen tunnin"
//           : selectedView === "day"
//           ? "viimeisen päivän"
//           : "viimeisen viikon"}{" "}
//         aikana
//       </h2>
//       <Bar
//         data={{
//           labels: [
//             "Sallitut",
//             "Kielletyt",
//             "Estetyt",
//             "Haittaohjelmatapahtuma",
//           ],
//           datasets: [
//             {
//               label: "Tietojen siirrot",
//               backgroundColor: ["#769643", "#dd4545", "#ddd845"],
//               borderColor: ["#ffffff"],
//               borderWidth: 1,
//               data: [
//                 chartData.actionAllowed,
//                 chartData.actionDenied,
//                 chartData.actionBlocked,
//                 chartData.actionTypeDanger,
//               ],
//             },
//           ],
//         }}
//         options={options}
//       />
//       <section className="chartLogSection">
//         <button className="logButton">Tarkastle lokeja</button>
//         <Filter selectedView={selectedView} onSelect={handleViewSelect} />
//       </section>
//     </div>
//   );
// };

// export default UnusualDataTransfer;
