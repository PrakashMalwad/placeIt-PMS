const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const Student = require("../models/Users/Students");
const Drive = require("../models/JobDrives");
const Company = require("../models/company");
const PlacementCoordinator = require("../models/Users/PlacementCoordinator");
const {
  updatePlacementStatistics,
} = require("../services/placementStatisticService");

let gfs, gridfsBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Initialize GridFSBucket
    gridfsBucket = new GridFSBucket(conn.connection.db, {
      bucketName: "uploads",
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

        // Handle 'insert' and 'update' events
        if (
          change.operationType === "insert" ||
          change.operationType === "update"
        ) {
          const drive =
            change.fullDocument ||
            (await Drive.findById(change.documentKey._id));

          // Extract the postedBy (PlacementCoordinator ID)
          const collegeCoordId = drive.postedBy;

          // Find the corresponding PlacementCoordinator to get the collegeId
          const placementCoordinator = await PlacementCoordinator.findById(
            collegeCoordId
          );

          if (placementCoordinator && placementCoordinator.college) {
            const collegeId = placementCoordinator.college;

            // Update placement statistics for the associated college
            await updatePlacementStatistics(collegeId);
          } else {
            console.error(
              "College not found for the placement coordinator:",
              collegeCoordId
            );
          }
        }
      });

      console.log(
        "Started watching for changes in Student and Drive collections..."
      );
    };

    // Start watching when the application starts
    startChangeStream();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

// Export both the connectDB function and gfs/gridfsBucket
module.exports = { connectDB, gfs };
