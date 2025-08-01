import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "AuthenticationSystem",
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
