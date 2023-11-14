import express from "express";
import {
  getAptitudeQuestions,
  isValidAptitude,
  createImageLink,
  submitTest,
  isTestSubmitted,
  createAptitude,
} from "../controller/aptiController.js";

const router = express.Router();

router.route("/create/aptitude").post(createAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);
router.route("/aptitude/check/:aptitudeId").get(isValidAptitude);
router.route("/create-image-link").post(createImageLink);
router.route("/submit").patch(submitTest);
router.route("/isSubmitted").post(isTestSubmitted);

export default router;
