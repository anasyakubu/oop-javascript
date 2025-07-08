
import express from "express";
import { registerUser, login } from "../controllers/user.controller";
const router = express.Router();
// import { requireAuth } from "../middleware/authMiddleware";
// import upload from "../middleware/upload";


//*********** ALL APP ROUTES ***********//
router.post("/user/register", registerUser);
router.post("/auth", login);



export default router;
