import { Request, Response } from "express"
import CreateSubscription from "../services/createSubscription";
import CreateSubscriptionFlutterwave from "../services/createSubscriptionFlutterwave";


const create_subscription = async (req: Request, res: Response): Promise<void> => {

  try {

    const { plancode, email, name, amount, userID } = req.body;

    const subscription = new CreateSubscription(plancode, email, name, amount, userID);
    // console.log("Creating subscription with plan code:", plancode); // for debugging (1)
    const result = await subscription.createSubscription();

    res.status(200).json({
      success: true,
      data: result
    })

  } catch (error: any) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ success: false, msg: "Error creating subscription", error });
  }

}


const create_subscriptionFL = async (req: Request, res: Response): Promise<void> => {

  try {

    const { plancode, email, name, amount, userID, appID } = req.body;

    const subscriptionFL = new CreateSubscriptionFlutterwave(plancode, email, name, amount, userID, appID);
    // console.log("Creating Flutterwave subscription with plan code:", plancode); // for debugging
    const result = await subscriptionFL.createSubscriptionFL();

    res.status(200).json({
      success: true,
      data: result
    });


  } catch (error: any) {
    console.error("Error creating Flutterwave subscription:", error);
    res.status(500).json({ success: false, msg: "Error creating Flutterwave subscription", error });

  }

}

export { create_subscription, create_subscriptionFL }