import  express  from "express";
import { adminLogin, getallUnverifyClients, verifyClients } from "../controller/adminController.js";
const router  = express.Router();

router.route("/admin-login").post(adminLogin);
router.route("/getall-unverifiedClients").get(getallUnverifyClients);
router.route("/verify-client/:clientId").get(verifyClients);

export default router;