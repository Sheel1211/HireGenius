import express from "express";
import { clientProfileUpdate, clientRegistration, getClientData } from "../controller/clientController.js";
const router = express.Router();

router.route("/registration").post(clientRegistration);
router.route("/update-profile").post(clientProfileUpdate);
router.route("/client-data/:clientId").get(getClientData);

export default router;
