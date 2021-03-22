const express = require('express');
const cors = require('cors');
// const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path')

require('dotenv').config();

const app = express();
app.use(cookieParser())
app.use(express.json())

// app.use(cors());
app.use(cors({origin: 'http://localhost:3000', credentials:true}))

// connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("All good");
  } catch (error) {
    console.log("DW error with connection");
    process.exit(1);
  }
};
connectDB();

// app.use('/test', (req, res) => {
//   res.send("backend working")  
// });

const productsRouter = require('./routes/products');
app.use("/api/products", productsRouter)

const categoryRouter = require('./routes/category');
app.use("/api/category", categoryRouter)

const userRouter = require('./routes/user');
app.use("/user", userRouter)

const paymentRouter = require('./routes/payments');
app.use("/api/payments", paymentRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server running");
});

module.exports = connectDB;