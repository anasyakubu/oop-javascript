
import express from "express";
import { fetchData } from "../controllers/fetch.controller";
const router = express.Router();
// import { requireAuth } from "../middleware/authMiddleware";
// import upload from "../middleware/upload";


//*********** ALL APP ROUTES ***********//
router.post("/fetch", fetchData);



export default router;
