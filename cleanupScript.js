require('dotenv').config();

const connectDB = require("./server");
const User= require("./models/user");


connectDB();

const cleanData = async () => {
  try {
    await User.deleteMany({});   
    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

cleanData();
