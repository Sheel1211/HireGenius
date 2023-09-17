import  express  from "express";
import { adminLogin, adminLogout, getallApprovedClients, getallPendingClients, getallRejectedClients, loadAdminDetails, rejectClients, verifyClients } from "../controller/adminController.js";
import isAdminAuthenticated from "../middleware/adminAuth.js";
const router  = express.Router();

router.route("/admin-login").post(adminLogin);
router.route("/me").get(isAdminAuthenticated,loadAdminDetails);
router.route("/admin-logout").get(isAdminAuthenticated,adminLogout);
router.route("/getall-clients").get(isAdminAuthenticated,getallPendingClients);
router.route("/getall-rejected-clients").get(isAdminAuthenticated,getallRejectedClients);
router.route("/getall-approved-clients").get(isAdminAuthenticated,getallApprovedClients);
router.route("/verify-client/:clientId").post(isAdminAuthenticated,verifyClients);
router.route("/reject-client/:clientId").post(isAdminAuthenticated,rejectClients);

export default router;