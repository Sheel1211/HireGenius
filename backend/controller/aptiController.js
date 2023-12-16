import Aptitude from "../models/aptitudeSchema.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/uploadFileS3.service.js";
import interview from "../models/interviewSchema.js";
import candidate from "../models/candidateSchema.js";
import e from "express";

export const createAptitude = async (req, res) => {
  try {
    const { interviewId, questions } = req.body;

    const aptitudeId = uuidv4();
    const AptitudeLink = `http://localhost:5173/aptitude/${aptitudeId}`;

    const newAptitude = await Aptitude({
      aptitudeId,
      questions,
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
    const { interviewId, questions, prevRoundId } = req.body;

    const aptitudeId = uuidv4();
    const AptitudeLink = `http://localhost:5173/aptitude/${aptitudeId}`;

    const newAptitude = await Aptitude({
      aptitudeId,
      questions,
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

    const { questions, testDuration, negativeMarking } = aptitude;
    res.status(200).json({
      success: true,
      questions,
      testDuration,
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

    const currentDateTime = new Date();
    if (
      !(
        currentDateTime >= validAptitude.startTime &&
        currentDateTime <= validAptitude.endTime
      )
    ) {
      throw new Error("Test is not active yet...");
    }
    // if (validAptitude.expiry && currentDate > validAptitude.expiry) {
    //   throw new Error("Test link has expired");
    // }

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
    const { aptitudeId, candidateId, gain, total } = req.body;

    // Find the aptitude based on aptitudeId
    const aptitude = await Aptitude.findOne({ aptitudeId });

    if (!aptitude) {
      return res.status(404).json({
        success: false,
        message: "Aptitude not found",
      });
    }

    // Find the index of the candidate within the candidates array
    const candidateIndex = aptitude.candidates.findIndex(
      (candidate) => candidate.candidateId.toString() === candidateId.toString()
    );

    if (candidateIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found in the aptitude test",
      });
    }

    // Update gain and total for the specific candidate
    aptitude.candidates[candidateIndex].gain = gain;
    aptitude.candidates[candidateIndex].total = total;

    aptitude.candidates[candidateIndex].isSubmitted = true;

    // Save the updated aptitude
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

    const candidateTest = aptitude.candidates.find(
      (candidate) => candidate.candidateId.toString() === candidateId.toString()
    );

    if (!candidateTest || !candidateTest.isSubmitted) {
      return res.status(200).json({ success: true, isSubmitted: false });
    } else {
      throw new Error("You have already submitted the test");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const startAptitudeTest = async (req, res, next) => {
  try {
    const { aptitudeId, startDateTime } = req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    aptitude.startTime = startDateTime;

    await aptitude.save();

    res.status(200).json({ success: true, message: "Test is started" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const endAptitudeTest = async (req, res, next) => {
  try {
    const { aptitudeId, endDateTime } = req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    aptitude.endTime = endDateTime;

    await aptitude.save();

    res.status(200).json({ success: true, message: "Test is ended" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const setAptitudeTestTimes = async (req, res, next) => {
  try {
    const { aptitudeId, startTime, endTime, testDuration, negativeMarking } =
      req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    aptitude.startTime = startTime;
    aptitude.endTime = endTime;
    aptitude.testDuration = testDuration;
    aptitude.negativeMarking = negativeMarking;

    await aptitude.save();

    res.status(200).json({ success: true, message: "Test is ended" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const completeTest = async (req, res, next) => {
  try {
    const { aptitudeId } = req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    aptitude.isCompleted = true;

    await aptitude.save();

    res
      .status(200)
      .json({ success: true, message: "Test is completed", aptitude });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const generateResult = async (req, res, next) => {
  try {
    const { aptitudeId } = req.body;
    const aptitude = await Aptitude.findOne({ aptitudeId });

    const candidateIds = aptitude.candidates;
    const result = await Promise.all(
      candidateIds.map(async (cand) => {
        const candidateDetails = await candidate.findOne({
          _id: cand.candidateId,
        });

        return {
          username: candidateDetails.username,
          email: candidateDetails.email,
          marks: cand.gain,
          total: cand.total,
        };
      })
    );
    res
      .status(200)
      .json({ success: true, message: "result is generated", result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
