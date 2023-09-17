import { allInterviews, sendEmailToAllCandidates } from "../controller/interviewController.js";
import express from "express";
import isauthenticated from "../middleware/auth.js";
const router = express.Router();

router.route("/all-interviews").get(isauthenticated,allInterviews);
router.route("/sendemail-to-candidates").post(isauthenticated,sendEmailToAllCandidates);

export default router