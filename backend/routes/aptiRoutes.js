import express from "express";
import {
  saveQuestions,
  createAptitude,
  getAptitudeQuestions,
  isValidAptitude,
  createImageLink,
} from "../controller/aptiController.js";

const router = express.Router();

router.route("/saveQuestions").patch(saveQuestions);
router.route("/createAptitude").post(createAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);
router.route("/aptitude/check/:aptitudeId").get(isValidAptitude);
router.route("/create-image-link").post(createImageLink);

export default router;
