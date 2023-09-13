import express from "express";
import clientRoute from "./clientRoute.js"
import codingRoute from "./codingRoute.js";
import adminRoute from "./adminRoute.js";

const router = express.Router();
router.use("/client", clientRoute);
router.use("/coding", codingRoute);
router.use("/admin",adminRoute)

export default router;
