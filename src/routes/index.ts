
import express from "express";
import fetchRoutes from "./fetch.routes";
import create_subRoutes from "./subscription.routes";
import userRoutes from "./user.routes";
import uploadRoutes from "./upload.routes";
import authorRoutes from "./author.routes";

const router = express.Router();

//********************** Routes Setup **********************//
router.use("/", fetchRoutes);
router.use("/", create_subRoutes);
router.use("/", userRoutes);
router.use("/", uploadRoutes);
router.use("/", authorRoutes);


export default router;
