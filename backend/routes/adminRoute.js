import  express  from "express";
import { adminLogin, getallApprovedClients, getallPendingClients, getallRejectedClients, rejectClients, verifyClients } from "../controller/adminController.js";
const router  = express.Router();

router.route("/admin-login").post(adminLogin);
router.route("/getall-clients").get(getallPendingClients);
router.route("/getall-rejected-clients").get(getallRejectedClients);
router.route("/getall-approved-clients").get(getallApprovedClients);
router.route("/verify-client/:clientId").post(verifyClients);
router.route("/reject-client/:clientId").post(rejectClients);

export default router;