require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("<h1> API is Running </h1>");
});

// Import and use routes
const auth = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const driveRoutes = require("./routes/driveRoutes");
const notifyRoutes = require("./routes/notifyRoute");
const applicationRoutes = require("./routes/applicationRoutes");
const studentRoutes = require("./routes/studentRoutes");
const testRoute = require("./routes/testRoute");
const enquireRoutes = require("./routes/enquireRoutes");
const homeRoutes = require("./routes/homeRoutes");
const fileRoutes = require("./routes/filesRoutes");
const otpRoutes = require("./routes/otpRoutes");
const ReqDriveRoutes = require("./routes/ReqDriveRoutes");
const statisticsRoutes = require("./routes/statsRoutes");
const profileRoutes = require("./routes/profileRoutes");

const interviewRoutes = require("./routes/interviewRoutes");
// Setting up all routes
app.use("/api/home", homeRoutes);
app.use("/api/interviews", auth.auth,interviewRoutes);
app.use("/api/",profileRoutes);
app.use("/api/statistics", auth.auth,statisticsRoutes );
app.use("/api/enquiries", enquireRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/file", auth.auth, fileRoutes);
app.use("/api/colleges", auth.auth, collegeRoutes);
app.use("/api/drives", auth.auth, driveRoutes);
app.use("/api/notifications", notifyRoutes);
app.use("/api/applications", auth.auth, applicationRoutes);
app.use("/api/students", auth.auth, studentRoutes);
app.use("/api/test-results", testRoute);
app.use("/api/otp", otpRoutes);
app.use("/api/users", auth.auth, userRoutes);
app.use("/api/reqDrive/", auth.auth, ReqDriveRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
