import coding from "../models/codingSchema.js";

export const createQuestion = async (req, res) => {
  try {
    const [question, testcases, duration] = req.body;
    const codingQuestion = new coding({ question, testcases}, duration);
    await question.save();

    res.status(200).json({
      success: true,
      message: "Question created successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};
