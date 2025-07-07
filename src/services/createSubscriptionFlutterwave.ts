import dotenv from "dotenv";
import axios from "axios";
import { generateCode } from "./codeGenerator";

class CreateSubscriptionFlutterwave {
  private FLUTTERWAVE_API: string;
  private FLUTTERWAVE_SECRET: string = process.env.FLUTTERWAVE_TEST_SECRET_KEY || "";


  constructor(public plancode: string, public email: string, public name: string,
    public amount: number, public userID: string, public appID: string = "daily-invoice-app"
  ) {
    dotenv.config();
    this.FLUTTERWAVE_API = process.env.FLUTTERWAVE_API_URL || "hhttps://api.flutterwave.com/v3";
  }


  async createSubscriptionFL(): Promise<any> {
    try {

      const response = await axios.post(`${this.FLUTTERWAVE_API}/payments`, {
        tx_ref: generateCode(9),
        payment_plan: this.plancode,
        amount: this.amount,
        currency: "NGN",
        redirect_url: `/subscription/callback`,
        customer: { email: this.email },
        meta: {
          userID: this.userID,
          appID: this.appID,
          payment_plan: this.plancode,
          type: 'subscription',
        },
      }, {
        headers: { Authorization: `Bearer ${this.FLUTTERWAVE_SECRET}` },
      });

      return response.data.data.link;

    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }


}


export default CreateSubscriptionFlutterwave;