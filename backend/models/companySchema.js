import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide company name"],
  },
  email: {
    type: String,
    required: [true, "Please provide company email"],
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  profile: {
    foundation_year: {
      type: String,
      required: [true, "Please provide foundation year"],
    },
    website: {
      type: String,
      required: [true, "Please provide website link"],
      validate: {
        validator: function (v) {
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          return urlRegex.test(v);
        },
        message: "Invalid website URL format",
      },
    },
    description: {
      type: String,
      required: [true, "Please provide description of company"],
    },
    industry: {
      type: String,
      required: [true, "Please provide industry of company"],
    },
    logo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const company = mongoose.model("company",companySchema);

export default company;