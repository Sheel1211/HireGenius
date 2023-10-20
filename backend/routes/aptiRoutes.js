import express from "express";
import {
  saveQuestions,
  createAptitude,
  getAptitudeQuestions,
  isValidAptitude,
  createImageLink,
  submitTest,
} from "../controller/aptiController.js";

const router = express.Router();

router.route("/saveQuestions").patch(saveQuestions);
router.route("/createAptitude").post(createAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);
router.route("/aptitude/check/:aptitudeId").get(isValidAptitude);
router.route("/create-image-link").post(createImageLink);
router.route("/submit").patch(submitTest);

export default router;
