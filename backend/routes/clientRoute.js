import express from "express";
import { clientRegistration } from "../controller/clientController.js";
const router = express.Router();
router.route("/registration").post(clientRegistration);

export default router;
