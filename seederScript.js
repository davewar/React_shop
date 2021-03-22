require('dotenv').config();

const productData = require("./data");
const connectDB = require("./server");
const Product = require("./models/products");
const Category = require("./models/category");

const categoryData = [
      {
        name: "Man",
      },
      {
        name: "Woman",
      },
      {
        name: "trainers",
      },
      {
        name: "Electronics"
      }, 
    ]

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productData);

    await Category.deleteMany({});    
    await Category.insertMany(categoryData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
