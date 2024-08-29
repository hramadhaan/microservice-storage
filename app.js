const express = require("express");
const PORT = process.env.PORT || 8000;
require("dotenv").config();

// Import Routes
const uploadRoutes = require("./routes/upload");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/upload", uploadRoutes);

// Promise Error
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    success: false,
    message: message,
  });
});

app.listen(PORT, (success) => {
  console.log("Listener: ", "success");
});
