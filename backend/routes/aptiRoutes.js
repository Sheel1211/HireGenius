const express = require("express");
const {
  saveQuestions,
  createAptitude,
  getAptitudeQuestions,
} = require("../controller/aptiController");
const router = express.Router();

router.route("/saveQuestions").patch(saveQuestions);
router.route("/createAptitude").post(createAptitude);
router.route("/aptitude/questions/:aptitudeId").get(getAptitudeQuestions);

module.exports = router;
