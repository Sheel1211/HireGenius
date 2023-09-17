import client from "../models/clientSchema.js";
import jwt from "jsonwebtoken";
import admin from "../models/adminSchema.js";

const isAdminAuthenticated = async (req, res,next) => {
  // console.log(req.cookies); 
  try {
    const { token } = req.cookies;
    console.log("token",token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Login to Access this resource",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    console.log("decoded",decoded)
    const adminData = await admin.findById({ _id: decoded.id });

    console.log("admin: " ,adminData);
    if (!adminData) {
      return res.status(400).json({
        success: false,
        message: "No admin with these credentials found",
      });
    }

    req.user = adminData;
    next();
  } catch (e) {
    // console.log("errorrrrr")
    res.status(400).json({
      success: false,
    });
  }
};

export default isAdminAuthenticated;
