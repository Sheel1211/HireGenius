import express from "express";
import {
  adminLogin,
  adminLogout,
  getallApprovedClients,
  getallPendingClients,
  getallRejectedClients,
  loadAdminDetails,
  rejectClients,
  verifyClients,
} from "../controller/adminController.js";
import isauthenticated from "../middleware/auth.js";
const router = express.Router();

router.route("/admin-login").post(adminLogin);
router.route("/me").get(isauthenticated, loadAdminDetails);
router.route("/admin-logout").get(isauthenticated, adminLogout);
router.route("/getall-clients").get(isauthenticated, getallPendingClients);
router
  .route("/getall-rejected-clients")
  .get(isauthenticated, getallRejectedClients);
router
  .route("/getall-approved-clients")
  .get(isauthenticated, getallApprovedClients);
router.route("/verify-client/:clientId").post(isauthenticated, verifyClients);
router.route("/reject-client/:clientId").post(isauthenticated, rejectClients);

// token
router.route("/admin-login").post(adminLogin);
router.route("/me/:token").get(isauthenticated, loadAdminDetails);
router.route("/admin-logout/:token").get(isauthenticated, adminLogout);
router
  .route("/getall-clients/:token")
  .get(isauthenticated, getallPendingClients);
router
  .route("/getall-rejected-clients/:token")
  .get(isauthenticated, getallRejectedClients);
router
  .route("/getall-approved-clients/:token")
  .get(isauthenticated, getallApprovedClients);
router
  .route("/verify-client/:clientId/:token")
  .post(isauthenticated, verifyClients);
router
  .route("/reject-client/:clientId/:token")
  .post(isauthenticated, rejectClients);

export default router;
