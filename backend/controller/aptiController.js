const Aptitude = require("../models/aptitudeSchema");
const { v4: uuidv4 } = require("uuid");

const saveQuestions = async (req, res) => {
  try {
    // Save all the question
    const { aptitudeId, questions } = req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId: aptitudeId });
    aptitude.questions = questions;
    await aptitude.save();

    // Generate Link logic

    res
      .status(200)
      .json({ success: true, message: "Question added", AptitudeLink: "" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const createAptitude = async (req, res) => {
  try {
    const aptitudeId = uuidv4();
    const newAptitude = await Aptitude({ aptitudeId });
    await newAptitude.save();
    res.status(200).json({
      success: true,
      aptitude: newAptitude,
      message: "Aptitude created",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAptitudeQuestions = async (req, res) => {
  try {
    const { aptitudeId } = req.params;
    const aptitude = await Aptitude.findOne({ aptitudeId });

    if (!aptitude) {
      throw new Error("No Aptitude Record Found");
    }
    res.status(200).json({
      success: true,
      questions: aptitude.questions,
      message: "Aptitude created",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { saveQuestions, createAptitude, getAptitudeQuestions };
