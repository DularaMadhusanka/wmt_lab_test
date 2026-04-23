const mongoose = require("mongoose");

const validateMongoUri = (mongoUri) => {
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing from backend/.env");
  }

  if (/(^|[,@])host[123](?=[:/,\s]|$)/i.test(mongoUri)) {
    throw new Error(
      "MONGO_URI still contains placeholder hosts (host1/host2/host3). Replace it with your real local MongoDB or MongoDB Atlas connection string."
    );
  }
};

const connectDB = async () => {
  try {
    validateMongoUri(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
