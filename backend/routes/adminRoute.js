import  express  from "express";
import { adminLogin, getallClients , verifyClients } from "../controller/adminController.js";
const router  = express.Router();

router.route("/admin-login").post(adminLogin);
router.route("/getall-clients").get(getallClients);
router.route("/verify-client/:clientId").get(verifyClients);

export default router;