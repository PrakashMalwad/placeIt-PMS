const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

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
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

// Export both the connectDB function and gfs/gridfsBucket
module.exports = { connectDB, gfs };
