const express = require("express");
const {
  saveQuestions,
  createAptitude,
  getAptitudeQuestions,
  isValidAptitude,
} = require("../controller/aptiController");
const router = express.Router();

router.route("/saveQuestions").patch(saveQuestions);
router.route("/createAptitude").post(createAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);
router.route("/aptitude/check/:aptitudeId").get(isValidAptitude);

module.exports = router;
