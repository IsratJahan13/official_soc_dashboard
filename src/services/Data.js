import axios from "axios";
const apiUrl =
  "https://app-soc-data-server.politefield-c4736012.northeurope.azurecontainerapps.io/dynlogs";

const getAllData = (mocFileName) => {
  return axios.get(apiUrl + mocFileName);
};

export default { getAllData };
