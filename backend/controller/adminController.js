import admin from "../models/adminSchema.js";
import client from "../models/clientSchema.js";
import { sendEmail } from "../services/sendEmail.service.js";

import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    const adminData = await admin.findOne({ email, password });
    console.log("adminData : ", adminData);
    if (!adminData || adminData === undefined || adminData === null) {
      return res
        .status(422)
        .send({ success: false, message: "No Admin for given data" });
    }

    const authToken = jwt.sign({ id: adminData._id }, process.env.JWT_KEY);
    adminData.authToken = authToken;

    await adminData.save();

    return res
      .status(200)
      .cookie("token", authToken, {
        expires: new Date(Date.now() + 10 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
      })
      .send({
        success: true,
        message: "admin loggedIn successfully",
        token: authToken,
        adminData,
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const loadAdminDetails = async (req, res) => {
  const user = await admin.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

export const getallPendingClients = async (req, res) => {
  try {
    // console.log("Hello")
    const allUnverifiedClients = await client.find({
      approved: false,
      rejected: false,
    });

    if (allUnverifiedClients) {
      return res
        .status(200)
        .send({ success: true, data: allUnverifiedClients });
    } else {
      return res
        .status(422)
        .send({ success: false, message: "No unverified Clients are there" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const getallRejectedClients = async (req, res) => {
  try {
    const allRejectedClients = await client.find({
      approved: false,
      rejected: true,
    });

    if (allRejectedClients) {
      return res.status(200).send({ success: true, data: allRejectedClients });
    } else {
      return res
        .status(422)
        .send({ success: false, message: "No rejected Clients are there" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const getallApprovedClients = async (req, res) => {
  try {
    const allApprovedClients = await client.find({
      approved: true,
      rejected: false,
    });

    if (allApprovedClients) {
      return res.status(200).send({ success: true, data: allApprovedClients });
    } else {
      return res
        .status(422)
        .send({ success: false, message: "No Approved Clients are there" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const verifyClients = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { message } = req.body;

    const clientData = await client.findOneAndUpdate(
      { _id: clientId },
      { approved: true }
    );

    if (clientData) {
      const data = await sendEmail(
        "barotpratham266@gmail.com",
        "Hiregenius Application Status",
        `Application Status: Approved. ${message}`
      );
      console.log("email data : ", data);
      return res
        .status(200)
        .send({ success: true, message: "Client is Verified successfully" });
    } else {
      return res
        .status(422)
        .send({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const rejectClients = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { message } = req.body;

    const clientData = await client.findOneAndUpdate(
      { _id: clientId },
      { rejected: true }
    );

    if (clientData) {
      const data = await sendEmail(
        "barotpratham266@gmail.com",
        "Hiregenius Application Status",
        `Application Status: Rejected. ${message}`
      );
      console.log("email data : ", data);
      return res
        .status(200)
        .send({ success: true, message: "Client is Rejected successfully" });
    } else {
      return res
        .status(422)
        .send({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};
