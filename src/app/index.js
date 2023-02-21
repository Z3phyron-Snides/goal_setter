const express = require("express");
const { errorHandler } = require("../middlewares/errorMiddleware");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require('cors');
const goalRoutes = require("../routes/goalRoutes");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const rootRoutes = require("../routes/root");
const connectDB = require("../config/db");

const app = express();

connectDB();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", rootRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

module.exports = app;
