import mongoose from "mongoose";
// console.log(process.env.PORT);

export const connectDB = () => {
  mongoose
    .connect(`${process.env.DB_URI}`)
    .then(() => {
      console.log("MongoDB connection established.");
    })
    .catch((e) => {
      console.log("MongoDB connection not established.", e.message);
    });
};
