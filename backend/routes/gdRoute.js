import {
  getGdDetails,
  landingRoom,
  scheduleMeet,
} from "../controller/gdController.js";
import express from "express";
const router = express.Router();

router.route("/meet/:roomId").get(landingRoom);
router.route("/schedule/meet").post(scheduleMeet);
router.route("/details/:gdId").get(getGdDetails);

export default router;
