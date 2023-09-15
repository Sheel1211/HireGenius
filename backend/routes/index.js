import express from "express";
import clientRoute from "./clientRoute.js"
import codingRoute from "./codingRoute.js";

const router = express.Router();
router.use("/client", clientRoute);
router.use("/coding", codingRoute);

export default router;
