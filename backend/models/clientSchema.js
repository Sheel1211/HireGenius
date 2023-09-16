import mongoose from "mongoose";
import validator from "validator"
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    validate: [validator.isEmail, "Provide valid Email"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },
  url: {
    type: String,
    required: [true, "Enter your website link"],
    validate: [validator.isURL, "Provide valid URL"],
  },
  description: {
    type: String,
    required: [true, "Enter your description"],
  },
  contactno: {
    type: Number,
    length: 10,
    required: [true, "Enter your Contact Number"],
  },
  sector: {
    type: String,
    required: [true, "Enter your sector"],
  },
  interviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
  validcertificate: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  logo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  approved: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
});

const client = mongoose.model("client", clientSchema);
export default client;
