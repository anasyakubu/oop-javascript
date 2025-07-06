
import express from "express";
import fetchRoutes from "./fetch.routes";





const router = express.Router();

//********************** Routes Setup **********************//
router.use("/", fetchRoutes);


export default router;
