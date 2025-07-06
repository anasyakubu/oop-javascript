import { FetchServices } from "../services/fetchServices";
import { Request, Response } from "express"


const fetchData = async (req: Request, res: Response): Promise<void> => {

  try {

    const { url } = req.body;

    if (!url) {
      res.status(400).json({ success: false, message: "URL is required" });
      return;
    }

    const fetchServices = new FetchServices(url);

    //  console.log("Fetching data from:", url); for debugging (1)
    const data = await fetchServices.getData(url);
    // const data = await fetchServices.getDataName(url);


    res.status(200).json({ success: true, data });
  } catch (error) {

    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Error fetching data", error });
  }

}

// Exporting the fetchData function to be used in routes
export { fetchData, };
