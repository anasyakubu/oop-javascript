
import express from "express";
import { create_subscription, create_subscriptionFL } from "../controllers/subscription.controller";
const router = express.Router();
// import { requireAuth } from "../middleware/authMiddleware";
// import upload from "../middleware/upload";


//*********** ALL APP ROUTES ***********//
router.post("/create-subscription", create_subscription);
router.post("/create-subscription-flutterwave", create_subscriptionFL);



export default router;
