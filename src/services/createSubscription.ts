import dotenv from "dotenv";
import axios from "axios";
import { generateCode } from "./codeGenerator";

class CreateSubscription {
  private apiUrl: string;
  private PAYSTACK_SECRET_KEY: string = process.env.PAYSTACK_TEST_SECRET_KEY || "";


  constructor(public plancode: string, public email: string, public name: string,
    public amount: number, public userID: string,
  ) {
    dotenv.config();
    this.apiUrl = process.env.API_URL || "https://api.paystack.co";
  }


  async createSubscription(): Promise<any> {
    try {

      // console.log(`Creating subscription with key: ${this.PAYSTACK_SECRET_KEY}`); // for debugging (1)

      //*********** Calculate trial dates ***********/
      // const trialStart = new Date();
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 30); // 30-day free trial

      const planPayload = {
        name: "Invoice Management Subscription",
        interval: "monthly",
        amount: this.amount * 100, // amount in kobo (for NGN, 10000 kobo = ₦100)
        description: "Subscription for Daily Invoice Management System"
      };

      const planResponse = await axios.post(`${this.apiUrl}/plan`, planPayload, {
        headers: {
          Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json'
        }
      });

      const planData = planResponse.data.data;

      //*********** Initialize a one-time payment first ***********//
      const paymentPayload = {
        email: this.email,
        amount: this.amount,
        plan: planData.plan_code,
        metadata: { userID: this.userID, planCode: planData.plan_code },
      };

      const paymentResponse = await axios.post(`${this.apiUrl}/transaction/initialize`, paymentPayload, {
        headers: {
          Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const paymentData = paymentResponse.data.data;

      return paymentData;

    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }

}

export default CreateSubscription;
