import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("=> connected to DB")
    );
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw err;
  }
};
