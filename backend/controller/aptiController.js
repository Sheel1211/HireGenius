import Aptitude from "../models/aptitudeSchema.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/uploadFileS3.service.js";
import interview from "../models/interviewSchema.js";
import candidate from "../models/candidateSchema.js";

export const createAptitude = async (req, res) => {
  try {
    const { interviewId, questions, duration, negativeMarking, expiryDate } =
      req.body;

    const aptitudeId = uuidv4();
    const AptitudeLink = `http://localhost:5173/aptitude/${aptitudeId}`;

    const newAptitude = await Aptitude({
      aptitudeId,
      questions,
      duration,
      negativeMarking,
      expiry: expiryDate,
      testLink: AptitudeLink,
    });

    const oldInterview = await interview.findOne({ _id: interviewId });
    oldInterview.rounds.push({ roundId: newAptitude._id, name: "Aptitude" });

    const candidateIds = oldInterview.candidates.map(
      (interview) => interview.candidateId
    );

    candidateIds.forEach((candidateId) =>
      newAptitude.candidates.push({ candidateId: candidateId })
    );

    await newAptitude.save();
    await oldInterview.save();

    res.status(200).json({
      success: true,
      message: "Link generated...",
      AptitudeLink,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createAnotherAptitude = async (req, res, next) => {
  try {
    const {
      interviewId,
      questions,
      duration,
      negativeMarking,
      expiryDate,
      prevRoundId,
    } = req.body;

    const aptitudeId = uuidv4();
    const AptitudeLink = `http://localhost:5173/aptitude/${aptitudeId}`;

    const newAptitude = await Aptitude({
      aptitudeId,
      questions,
      duration,
      negativeMarking,
      expiry: expiryDate,
      testLink: AptitudeLink,
    });

    const oldInterview = await interview.findOne({ _id: interviewId });
    oldInterview.rounds.push({ roundId: newAptitude._id, name: "Aptitude" });

    const prevRound = await Aptitude.findOne({ _id: prevRoundId });
    const selectedCandidateIds = prevRound.candidates
      .map((candidate) => {
        if (!candidate.isRejected) return candidate.candidateId;
      })
      .filter((candidateId) => candidateId !== undefined);

    console.log(selectedCandidateIds);

    selectedCandidateIds.forEach((candidateId) =>
      newAptitude.candidates.push({ candidateId: candidateId })
    );

    await newAptitude.save();
    await oldInterview.save();

    res.status(200).json({
      success: true,
      message: "Link generated...",
      AptitudeLink,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAptitudeQuestions = async (req, res) => {
  try {
    const { aptitudeId } = req.params;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    if (!aptitude) {
      throw new Error("No Aptitude Record Found");
    }
    const { questions, duration, negativeMarking } = aptitude;
    res.status(200).json({
      success: true,
      questions,
      duration,
      negativeMarking,
      message: "Aptitude created",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAptitudeDetails = async (req, res, next) => {
  try {
    const { aptitudeId } = req.params;

    const aptitude = await Aptitude.findOne({ _id: aptitudeId });
    if (!aptitude) {
      throw new Error("Something went wrong.");
    }

    res.status(200).json({
      aptitude,
      success: true,
      message: "Valid aptitude",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const isValidAptitude = async (req, res, next) => {
  try {
    const { aptitudeId } = req.params;

    const validAptitude = await Aptitude.findOne({ aptitudeId });
    if (!validAptitude) {
      throw new Error("Not a valid aptitude link");
    }

    const currentDate = new Date();
    if (expiry && currentDate > expiry) {
      throw new Error("Test link has expired");
    }

    res.status(200).json({
      success: true,
      message: "Valid aptitude",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createImageLink = async (req, res) => {
  const image = req.files.img;
  // console.log(image);

  try {
    const uploadImage = await uploadFile(image, `${image.name}_${image.size}`);
    // console.log("upload image : ",uploadImage)
    if (uploadImage) {
      const uploadImageLocation = uploadImage.Location;
      // console.log("upload image : ",uploadImageLocation)

      return res
        .status(200)
        .send({ success: true, message: uploadImageLocation });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "file not uploaded" });
    }
  } catch {
    return res
      .status(400)
      .send({ success: false, message: "something went wrong!" });
  }
};

export const submitTest = async (req, res) => {
  try {
    const { aptitudeId, ...data } = req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    aptitude.candidates.push(data);
    await aptitude.save();

    res.status(200).json({
      success: true,
      message: "test submitted",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const isTestSubmitted = async (req, res) => {
  try {
    const { aptitudeId, username, password } = req.body;

    const aptitude = await Aptitude.findOne({ aptitudeId });
    if (!aptitude) {
      throw new Error("Not a valid aptitude link");
    }

    const candidateData = await candidate.findOne({ username, password });
    if (!candidateData) {
      throw new Error("You are not allowed to give the test");
    }
    const candidateId = candidateData._id;

    const isSubmitted = aptitude.candidates.some((candidate) => {
      return candidate.candidateId.equals(candidateId);
    });
    if (isSubmitted) {
      throw new Error("You have already submitted the test");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
