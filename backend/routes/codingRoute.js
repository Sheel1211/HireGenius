import { createQuestion } from "../controller/codingController.js";
import isAuthenticated from "../middleware/auth.js";

import express from "express";
const router = express.Router();
router.route("/create").post(createQuestion);

export default router;
