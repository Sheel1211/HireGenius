import {
  allInterviews,
  allRoundsOfInterview,
  sendEmailToAllCandidates,
  sendEmailToAllCandidatesForAPT,
} from "../controller/interviewController.js";
import express from "express";
import isauthenticated from "../middleware/auth.js";
const router = express.Router();

router.route("/all-interviews").get(isauthenticated, allInterviews);
router.route("/all-interviews/:token").get(isauthenticated, allInterviews);
router
  .route("/sendemail-to-candidates")
  .post(isauthenticated, sendEmailToAllCandidates);
router
  .route("/send-email-apt-candidates/:token")
  .post(isauthenticated, sendEmailToAllCandidatesForAPT);
router.route("/all-rounds/:interviewId").get(allRoundsOfInterview);

export default router;
