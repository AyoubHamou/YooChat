import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDb connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error while connecting the database", error)
    process.exit(1);
  }
};
