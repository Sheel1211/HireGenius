import express from "express";
import { getCandidate } from "../controller/candidateController.js";
const router = express.Router();

router.route("/getCandidate").post(getCandidate);

export default router;
