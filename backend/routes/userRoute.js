import express from "express";
import { getUserData } from "../controller/userController.js";
import isauthenticated from "../middleware/auth.js";
const router = express.Router();

router.route("/me").get(isauthenticated, getUserData);

export default router;
