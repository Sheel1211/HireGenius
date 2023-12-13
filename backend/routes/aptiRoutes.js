import express from "express";
import {
  getAptitudeQuestions,
  isValidAptitude,
  createImageLink,
  submitTest,
  isTestSubmitted,
  createAptitude,
  getAptitudeDetails,
  createAnotherAptitude,
  startAptitudeTest,
  endAptitudeTest,
  setAptitudeTestTimes,
  completeTest,
} from "../controller/aptiController.js";

const router = express.Router();

router.route("/create/aptitude").post(createAptitude);
router.route("/create/another/aptitude").post(createAnotherAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);
router.route("/aptitude/details/:aptitudeId").get(getAptitudeDetails);
router.route("/aptitude/check/:aptitudeId").get(isValidAptitude);
router.route("/create-image-link").post(createImageLink);
router.route("/submit").patch(submitTest);
router.route("/isSubmitted").post(isTestSubmitted);
router.route("/start/aptitude").post(startAptitudeTest);
router.route("/end/aptitude").post(endAptitudeTest);
router.route("/set/aptitudelink/duration").post(setAptitudeTestTimes);
router.route("/complete/aptitude").patch(completeTest);

export default router;
