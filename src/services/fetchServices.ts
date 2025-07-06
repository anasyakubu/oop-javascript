import axios from "axios";

class FetchServices {

  constructor(public url: string) { }

  async getData(url: string = this.url): Promise<any> {
    try {
      const response = await axios.get(url);
      // return response;
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async getDataName(url: string = this.url): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data.documentation;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

// const FetchServices1 = new FetchServices("https://notifications.dailyinvoice.xyz/");

export { FetchServices };
