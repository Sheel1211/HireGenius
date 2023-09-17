import express from "express";
import clientRoute from "./clientRoute.js"
import codingRoute from "./codingRoute.js";
import adminRoute from "./adminRoute.js";
import userRoute from "./userRoute.js";


const router = express.Router();
router.use("/client", clientRoute);
router.use("/coding", codingRoute);
router.use("/admin",adminRoute);
router.use("/user",userRoute);

export default router;
