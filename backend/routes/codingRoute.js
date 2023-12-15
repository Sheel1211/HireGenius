import { addMarks, createQuestion, getQuestions, isValidCoding, viewResults } from "../controller/codingController.js";
import isAuthenticated from "../middleware/auth.js";

import express from "express";
const router = express.Router();
router.route("/create").post(createQuestion);
router.route("/getQuestions/:codingId").get(getQuestions);
router.route("/check/:codingId").get(isValidCoding);
router.route("/post/marks").post(addMarks);
router.route("/viewresults").post(viewResults);
export default router;
