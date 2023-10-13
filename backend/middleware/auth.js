import client from "../models/clientSchema.js";
import jwt from "jsonwebtoken";
import admin from "../models/adminSchema.js";
import candidate from "../models/candidateSchema.js";

const isauthenticated = async (req, res, next) => {
  console.log(req.cookies);

  try {
    const { token } = req.cookies;
    // console.log("token",token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Login to Access this resource",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // console.log("decoded", decoded);
    const adminData = await admin.findById({ _id: decoded.id });

    if (!adminData || adminData === undefined || adminData === null) {
      const clientData = await client.findById({ _id: decoded.id });

      if (!clientData || clientData === undefined || clientData === null) {
        const candidateData = await candidate.findById({ _id: decoded.id });

        if (
          !candidateData ||
          candidateData === undefined ||
          candidateData === null
        ) {
          return res.status(400).json({
            success: false,
            message: "No user with these credentials found",
          });
        } else {
          req.user = candidateData;
          req.type = "candidate";
        }
      } else {
        req.user = clientData;
        req.type = "client";
      }
    } else {
      req.user = adminData;
      req.type = "admin";
    }
    // console.log("type: ",req.type);
    // console.log("user: ",req.user);
    next();
  } catch (e) {
    // console.log("errorrrrr")
    res.status(400).json({
      success: false,
    });
  }
};

export default isauthenticated;
