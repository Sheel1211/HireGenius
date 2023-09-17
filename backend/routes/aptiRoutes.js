import express from "express";
import {
  saveQuestions,
  createAptitude,
  getAptitudeQuestions,
  isValidAptitude,
} from "../controller/aptiController.js";
const router = express.Router();

router.route("/saveQuestions").patch(saveQuestions);
router.route("/createAptitude").post(createAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);
router.route("/aptitude/check/:aptitudeId").get(isValidAptitude);

export default router;
