import candidate from "../models/candidateSchema.js";
import interview from "../models/interviewSchema.js";
import jwt from "jsonwebtoken";
import express from "express";
import Candidate from "../models/candidateSchema.js";

export const candidateLogin = async (req, res) => {
  console.log("yes in candidate login");
  try {
    const { username, password } = req.body;
    const candidateData = await candidate.findOne({ username, password });

    console.log("candidate data : ", candidateData);

    if (
      !candidateData ||
      candidateData === undefined ||
      candidateData === null
    ) {
      return res
        .status(204)
        .send({ success: false, message: "No candidate for given data" });
    } else {
      const authToken = jwt.sign(
        { id: candidateData._id },
        process.env.JWT_KEY
      );
      candidateData.authToken = authToken;
      await candidateData.save();
      return res
        .status(200)
        .cookie("token", authToken, {
          expires: new Date(Date.now() + 10 * 60 * 1000),
          httpOnly: true,
          sameSite: "none",
        })
        .send({
          success: true,
          message: "candidate loggedIn succcessfully",
          user: candidateData,
          type: "candidate",
        });
    }
  } catch (error) {
    return res.status(500).send({
      sucess: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};
// const express = require("express");
// const candidate = require("../models/candidateSchema");

export const getCandidate = async (req, res) => {
  try {
    const candidateId = req.body.candidateId;
    // console.log(clientId);

    const candidate = await Candidate.find({ _id: candidateId });
    console.log(candidate);

    res.json({ msg: "successful", candidate });
  } catch (error) {
    console.log(error);
    res.json({ msg: "error", error });
  }
};

export const getAllCandidates = async (req, res, next) => {
  try {
    console.log(req.body);
    const { candidateIds } = req.body;

    const candidates = await candidate.find(
      {
        _id: { $in: candidateIds },
      },
      "name email"
    );

    res.status(200).json({
      success: true,
      candidates: candidates,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// module.exports = { getAllCandidates };
