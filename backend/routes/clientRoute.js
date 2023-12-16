import express from "express";
import {
  addCandidatesWithUsernameAndPassword,
  clientLogin,
  clientProfileUpdate,
  clientRegistration,
  getClientData,
  logout,
} from "../controller/clientController.js";
import isauthenticated from "../middleware/auth.js";
const router = express.Router();

router.route("/registration").post(clientRegistration);
router.route("/update-profile").post(isauthenticated, clientProfileUpdate);
router.route("/client-data/:clientId").get(isauthenticated, getClientData);
router.route("/login").post(clientLogin);
router
  .route("/add/candidates")
  .post(isauthenticated, addCandidatesWithUsernameAndPassword);

// for those whose cookie is not working
router
  .route("/add/candidates/:token")
  .post(isauthenticated, addCandidatesWithUsernameAndPassword);

router
  .route("/client-data/:clientId/:token")
  .get(isauthenticated, getClientData);

router.route("/logout").get(logout);

export default router;
