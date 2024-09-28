const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const Student = require('../models/Users/Students');
const Drive = require('../models/JobDrives');
const Company = require('../models/company');
const { updatePlacementStatistics } = require('../services/placementStatisticService');

let gfs, gridfsBucket;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Initialize GridFSBucket
        gridfsBucket = new GridFSBucket(conn.connection.db, {
            bucketName: 'uploads', // Specify the collection name
        });

        // Initialize GridFS Stream
        gfs = gridfsBucket;

        //set watcher 

// Function to start watching for changes in collections
const startChangeStream = () => {
    // Watch for changes in the Student collection
    const studentChangeStream = Student.watch();
    studentChangeStream.on("change", async (change) => {
      console.log("Change detected in Student collection:", change);
      const collegeId = change.fullDocument?.college; // Ensure collegeId is accessible
      if (collegeId) {
        await updatePlacementStatistics(collegeId);
      }
    });
  
    // Watch for changes in the Drive collection
    const driveChangeStream = Drive.watch();
    driveChangeStream.on("change", async (change) => {
      console.log("Change detected in Drive collection:", change);
      const collegeId = change.fullDocument?.college; // Ensure collegeId is accessible
      if (collegeId) {
        await updatePlacementStatistics(collegeId);
      }
    });
  
    console.log("Started watching for changes in Student and Drive collections...");
  };
  
  // Start watching when the application starts
  startChangeStream();

    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

// Export both the connectDB function and gfs/gridfsBucket
module.exports = { connectDB, gfs };
