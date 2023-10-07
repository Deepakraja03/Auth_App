const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: [''],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

dbURI = process.env.MONGOURI;

//Connect mongodb
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
  
  app.use(express.json());
  
  app.listen(3000, () => {
      console.log("Server started on port 3000");
  })
  
  const userRoutes = require("./routes/userroutes");
  app.use('/user', userRoutes);
  const authRoutes = require("./routes/auth");
  app.use('/auth', authRoutes);

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
  })
