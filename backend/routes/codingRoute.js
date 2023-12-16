import {
  createQuestion,
  getQuestions,
} from "../controller/codingController.js";
import isAuthenticated from "../middleware/auth.js";

import express from "express";
const router = express.Router();
router.route("/create").post(createQuestion);
router.route("/getQuestions/:codingId").get(getQuestions);

export default router;
