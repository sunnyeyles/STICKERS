import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async () => {
  try {
    const dbUsername = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@ecommerce.1rapvds.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log("database connected");
  } catch (error) {
    console.error("connection error:", error);
  }
};
