import { uploadFile } from "../services/uploadFileS3.service.js";
import client from "../models/clientSchema.js";
import candidate from "../models/candidateSchema.js";
import interview from "../models/interviewSchema.js";
import jwt from "jsonwebtoken";
import { generateUniquePassword } from "../services/generateUniquePassword.js";

export const clientRegistration = async (req, res) => {
  try {
    const { name, email, password, url, description, contactno, sector } =
      req.body;
    
    if (
      !name ||
      !email ||
      !password ||
      !url ||
      !description ||
      !contactno ||
      !sector ||
      !req.files.validcertificate ||
      !req.files.logo
    ) {
      return res.status(400).send({ message: "All fields are required!" });
    } else {
      const clientExist = await client.findOne({ email: email });
      if (clientExist) {
        return res.status(422).send({ message: "Client Already registered" });
      } else {
      
        const certificate = await uploadFile(
          req.files.validcertificate,
          `${name}_Certi`
        );
        const logoData = await uploadFile(req.files.logo, `${name}_Logo`);

        const validcertificate = certificate.Location;
        const logo = logoData.Location;

        // console.log("validcertificate : ",validcertificate,"logo : ",logo);

        const clientData = client.create({
          name,
          email,
          password,
          url,
          description,
          contactno,
          sector,
          validcertificate: { url: validcertificate },
          logo: { url: logo },
        });
        return res
          .status(200)
          .send({ success: true, message: "Client registered" });
      }
    }
  } catch (error) {
    //console.log("error occurred : ",error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const clientProfileUpdate = async (req, res) => {
  try {
    const { name, email, password, url, description, contactno, sector } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !url ||
      !description ||
      !contactno ||
      !sector ||
      !req.files.validcertificate ||
      !req.files.logo
    ) {
      return res.status(400).send({ message: "All fields are required!" });
    } else {
      const clientExist = await client.findOne({ email: email });
      if (clientExist) {
        const certificate = await uploadFile(
          req.files.validcertificate,
          `${name}_Certi`
        );
        const logoData = await uploadFile(req.files.logo, `${name}_Logo`);

        const validcertificate = certificate.Location;
        const logo = logoData.Location;

        const clientData = client.findOneAndUpdate({
          name,
          email,
          password,
          url,
          description,
          contactno,
          sector,
          validcertificate: { url: validcertificate },
          logo: { url: logo },
        });
        return res
          .status(200)
          .send({ success: true, message: "Client Updated successfully." });
      } else {
        return res.status(422).send({ message: "Client not found" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const getClientData = async (req, res) => {
  try {
    const { clientId } = req.params;
    const clientData = await client.findById({ _id: clientId });
    if (clientData) {
      return res.status(200).send({ data: clientData, success: true });
    } else {
      return res.status(422).send({ message: "No Client with this email" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const clientData = await client.findOne({ email, password });

    if (!clientData || clientData === undefined || clientData === null) {
      return res
        .status(204)
        .send({ success: false, message: "No client for given data" });
    } else {
      const approveClientData = await client.findOne({
        email: email,
        password: password,
        approved: true,
        rejected: false,
      });
      if (
        !approveClientData ||
        approveClientData === undefined ||
        approveClientData === null
      ) {
        return res
          .status(202)
          .send({ success: false, message: "You are not Approved as client" });
      } else {
        const authToken = jwt.sign(
          { id: approveClientData._id },
          process.env.JWT_KEY
        );
        approveClientData.authToken = authToken;
        await approveClientData.save();
        return res
          .status(200)
          .cookie("token", authToken, {
            expires: new Date(Date.now() + 10 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
          })
          .send({
            success: true,
            message: "client loggedIn succcessfully",
            user: approveClientData,
            type: "client",
          });
      }
    }
  } catch (error) {
    return res.status(500).send({
      sucess: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

export const addCandidatesWithUsernameAndPassword = async (req, res) => {
  const { rows, title } = req.body;
  const candidateIds = [];

  await Promise.all(
    rows.map(async (item, index) => {
      if (item.id == "") return;
      console.log(index, " => ", item);
      const password = generateUniquePassword();

      const candidateDetails = new candidate({
        name: item.name,
        email: item.email,
        password,
        username: item.email.split("@")[0],
      });

      await candidateDetails.save();

      const candi = await candidate.findOne({ email: item.email });

      console.log("Hello candidate " + candi);
      candidateIds.push({ candidateId: candi._id });
      console.log("Here's array of candidates: " + candidateIds);
    })
  );

  const addToInterview = new interview({
    candidates: candidateIds,
    title,
    client: req.user._id,
  });

  await addToInterview.save();

  // Now you should have the correct association between candidates and interviews.

  console.log("Array of candidate ObjectIds: ", candidateIds);
};
