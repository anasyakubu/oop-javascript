


import { FetchServices1, FetchServices3 } from "../services/fetchServices";

async function fetchAndLogData() {
  try {
    console.log("Fetching data...");
    const data = await FetchServices1.getData();
    console.log("Data received:", data);
  } catch (error) {
    console.error("Error in fetchAndLogData:", error);
  }
}

async function fetchAndLogDataName() {
  try {
    console.log("Fetching data...");
    const data = await FetchServices1.getDataName();
    console.log("Data received:", data);
  } catch (error) {
    console.error("Error in fetchAndLogData:", error);
  }
}

fetchAndLogDataName();
