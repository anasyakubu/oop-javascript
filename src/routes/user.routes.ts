
import express from "express";
import { registerUser } from "../controllers/user.controller";
const router = express.Router();
// import { requireAuth } from "../middleware/authMiddleware";
// import upload from "../middleware/upload";


//*********** ALL APP ROUTES ***********//
router.post("/user/register", registerUser);



export default router;
