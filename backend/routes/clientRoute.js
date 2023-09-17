import express from "express";
import { addCandidatesWithUsernameAndPassword, clientLogin, clientProfileUpdate, clientRegistration, getClientData } from "../controller/clientController.js";
const router = express.Router();

router.route("/registration").post(clientRegistration);
router.route("/update-profile").post(clientProfileUpdate);
router.route("/client-data/:clientId").get(getClientData);
router.route("/login").post(clientLogin);
router.route('/add/candidates').post(addCandidatesWithUsernameAndPassword);

export default router;
