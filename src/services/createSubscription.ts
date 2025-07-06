import dotenv from "dotenv";
import axios from "axios";
import { generateCode } from "./codeGenerator";

class CreateSubscription {
  private apiUrl: string;
  private PAYSTACK_SECRET_KEY: string = process.env.PAYSTACK_SECRET_KEY || "";

  constructor(public plan: string, public plancode: string, public email: string, public name: string,
    public amount: number, public userID: string,
  ) {
    dotenv.config();
    this.apiUrl = process.env.API_URL || "https://api.paystack.co";
  }

  async createSubscription(): Promise<any> {
    try {

      //*********** Calculate trial dates ***********//
      const trialStart = new Date();
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 30); // 30-day free trial

    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }

}

export default CreateSubscription;
