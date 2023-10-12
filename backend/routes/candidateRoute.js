import express from "express";
import { candidateLogin } from "../controller/candidateController.js";
const router = express.Router();

router.route("/login").post(candidateLogin);

export default router;