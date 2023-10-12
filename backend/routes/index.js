import express from "express";
import clientRoute from "./clientRoute.js";
import codingRoute from "./codingRoute.js";
import adminRoute from "./adminRoute.js";
import userRoute from "./userRoute.js";
import interviewRoute from "./interviewRoute.js";
// const candidateRoute = require("./candidateRoute.js");
import candidateRoute from "./candidateRoute.js";

const router = express.Router();
router.use("/client", clientRoute);
router.use("/coding", codingRoute);
router.use("/admin", adminRoute);
router.use("/user", userRoute);
router.use("/interview", interviewRoute);
router.use("/candidate", candidateRoute);

export default router;
