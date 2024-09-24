require("dotenv").config();
const express = require("express");
const multer = require('multer'); 
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const driveRoutes = require("./routes/driveRoutes");
const notifyRoutes = require("./routes/notifyRoute");
const applicationRoutes = require("./routes/applicationRoutes");
const studendRoutes = require("./routes/studentRoutes");
const testRoute = require("./routes/testRoute");
const enquireRoutes = require("./routes/enquireRoutes.js");
const homeRoutes = require("./routes/homeRoutes.js");
const otpRoutes = require("./routes/otpRoutes");
// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> Api Chal Raha Hai </h1>");
});
// Routes
app.use("/api/home",homeRoutes );
app.use("/api/enquiries", enquireRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/colleges", auth.auth,collegeRoutes);
app.use("/api/drives", auth.auth,driveRoutes);
app.use("/api/notifications",notifyRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/students",auth.auth,studendRoutes);
app.use("/api/test-results",testRoute);
app.use("/api/otp", otpRoutes);
// Multer
app.use('/api/users',auth.auth,userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 5000;

//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
