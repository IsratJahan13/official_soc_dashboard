import React, { useEffect, useState } from "react";
import dataService from "../services/Data"; // Import data service
import Chart from "chart.js/auto"; // Import Chart.js with automatic version management
import { Bar } from "react-chartjs-2"; // Import Bar component from React Chart.js library
import Filter from "./Filter"; // Import Filter component

const LogIns = () => {
  // Define state variables
  const [selectedView, setSelectedView] = useState("day"); // Defines the selected view (hour or day)
  const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array
  const [total, setTotal] = useState(0);

  // Fetch data on initial render and whenever the selected view changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const response1 = await dataService.getAllData("/tyo_asema");
        const response2 = await dataService.getAllData("/palvelin");

        // Unite both datas
        const response = [...response1.data, ...response2.data];

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
        const filtered = response.filter(
          (entry) => new Date(entry.timestamp) >= startTime
        );
        // Set the filtered data
        setFilteredData(filtered);
        setTotal(filtered.length);
      } catch (error) {
        console.error("Error fetching data:", error); // Log error if data fetching fails
        setFilteredData([]);
        setTotal(0);
      }
    };

    fetchData(); // Call the fetchData function
  }, [selectedView]); // Depend on selectedView changes only

  // Process filtered data for the chart
  const processDataForChart = () => {
    let successfulLogins_tyoAsema = 0;
    let failedLogins_tyoAsema = 0;
    let successfulLogins_palvelin = 0;
    let failedLogins_palvelin = 0;

    if (filteredData && filteredData.length > 0) {
      const currentTime = new Date();

      // If the view is "hour", process data for the last hour only
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
        // Process data for other views (day, week) according to the original logic
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

    return chartData; // Return chart data
  };

  // Set options for the chart
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

  // Get chart data using processDataForChart function
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

// import React, { useEffect, useState } from "react";
// import dataService from "../services/Data"; // Import data service
// import Chart from "chart.js/auto"; // Import Chart.js with automatic version management
// import { Bar } from "react-chartjs-2"; // Import Bar component from React Chart.js library
// import Filter from "./Filter"; // Import Filter component

// const LogIns = () => {
//   // Define state variables
//   const [selectedView, setSelectedView] = useState("hour"); // Defines the selected view (hour or day)
//   const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array

//   // Fetch data on initial render and whenever the selected view changes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from the server
//         const response = await dataService.getAllData("/tyo_asema");
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
//     let successfulLogins = 0;
//     let failedLogins = 0;

//     if (filteredData && filteredData.length > 0) {
//       const currentTime = new Date();

//       // If the view is "hour", process data for the last hour only
//       if (selectedView === "hour") {
//         const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

//         filteredData.forEach((entry) => {
//           const entryTime = new Date(entry.timestamp);
//           if (entryTime >= oneHourAgo && entryTime <= currentTime) {
//             if (entry.logon_result === "Success") {
//               successfulLogins++;
//             } else if (entry.logon_result === "Failure") {
//               failedLogins++;
//             }
//           }
//         });
//         // Tulosta kirjautumisten määrä viimeisen tunnin ajalta
//         console.log(
//           `Kirjautumiset viimeisen tunnin aikana: Onnistuneet ${successfulLogins}, Epäonnistuneet ${failedLogins}`
//         );
//       } else {
//         // Process data for other views (day, week) according to the original logic
//         filteredData.forEach((entry) => {
//           const entryTime = new Date(entry.timestamp);
//           if (selectedView === "day") {
//             const oneDayAgo = new Date(
//               currentTime.getTime() - 24 * 60 * 60 * 1000
//             );
//             if (entryTime >= oneDayAgo && entryTime <= currentTime) {
//               if (entry.logon_result === "Success") {
//                 successfulLogins++;
//               } else if (entry.logon_result === "Failure") {
//                 failedLogins++;
//               }
//             }
//           } else if (selectedView === "week") {
//             const oneWeekAgo = new Date(
//               currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
//             );
//             if (entryTime >= oneWeekAgo && entryTime <= currentTime) {
//               if (entry.logon_result === "Success") {
//                 successfulLogins++;
//               } else if (entry.logon_result === "Failure") {
//                 failedLogins++;
//               }
//             }
//           }
//         });
//         console.log(
//           `Kirjautumiset viimeisen ${
//             selectedView === "day" ? "päivän" : "viikon"
//           } aikana: Onnistuneet ${successfulLogins}, Epäonnistuneet ${failedLogins}`
//         );
//       }
//     }

//     // Prepare data object for the bar chart
//     const chartData = {
//       labels: ["Onnistuneet", "Epäonnistuneet"],
//       datasets: [
//         {
//           label: "Sisäänkirjautumiset",
//           backgroundColor: ["#769643", "#dd4545"],
//           borderColor: ["#ffffff"],
//           borderWidth: 1,
//           data: [successfulLogins, failedLogins],
//         },
//       ],
//     };

//     return chartData; // Return chart data
//   };

//   // Set options for the chart
//   const options = {
//     scales: {
//       y: {
//         title: {
//           display: true,
//           text: "Kirjautumisten määrä (kpl)",
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
//     <div className="oneGraph">
//       <h2>
//         Sisäänkirjautumiset{" "}
//         {selectedView === "hour"
//           ? "viimeisen tunnin"
//           : selectedView === "day"
//           ? "viimeisen vuorokauden"
//           : "viimeisen viikon"}{" "}
//         aikana
//       </h2>
//       <Bar data={chartData} options={options} />
//       <section className="chartLogSection">
//         <button className="logButton">Tarkastle lokeja</button>
//         <Filter selectedView={selectedView} onSelect={handleViewSelect} />
//       </section>
//     </div>
//   );
// };

// export default LogIns;
