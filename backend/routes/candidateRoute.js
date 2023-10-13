import express from "express";
import { candidateLogin } from "../controller/candidateController.js";
import { getCandidate } from "../controller/candidateController.js";
const router = express.Router();

router.route("/login").post(candidateLogin);


router.route("/getCandidate").post(getCandidate);

export default router;
