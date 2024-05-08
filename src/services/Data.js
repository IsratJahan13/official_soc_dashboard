import axios from "axios";
const apiUrl = "http://localhost:3001";

const getAllData = (mocFileName) => {
  return axios.get(apiUrl + mocFileName);
};

//   export const fetchData = async (mocFileName) => {
//     try {
//       const { data } = await axios.get(apiUrl + mocFileName);
//       return data;
//     } catch (error) {
//       console.error("Virhe haettaessa dataa API:sta:", error);
//       throw error;
//     }
//   };
export default { getAllData };
