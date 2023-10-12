// const express = require("express");
// const candidate = require("../models/candidateSchema");

import express from "express";
import Candidate from "../models/candidateSchema.js";

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

// module.exports = { getAllCandidates };
