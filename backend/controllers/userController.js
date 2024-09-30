const { body, validationResult } = require('express-validator'); 
const User = require('../models/Users/User');
const Student = require('../models/Users/Students'); 
const PlacementCoordinator = require('../models/Users/PlacementCoordinator'); 
const CompanyCoordinator = require('../models/Users/CompanyCoordinator'); 
const Admin = require('../models/Users/admin'); 
const PlacementCellAdmin = require('../models/Users/PlacementCellAdmin');
const { gfs } = require('../config/db');


const bcrypt = require('bcryptjs'); // For password hashing

// get users count
exports.getUserCount = async () => {
  try {
    return await User.countDocuments();
  } catch (error) {
    console.error(`Error counting users: ${error.message}`);
    return 0;
  }
}
//get my company
exports.getMyCompany = async (req, res) => {
  try {
    const user = await CompanyCoordinator.findById(req.user.id
      ).populate('company','name contactNumber');
    if (!user) return res.status(404).json({ message: 'User not found' });
      
    res.json(user.company);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving company: ' + err.message });
  }
};  

// company coord count 
exports.getCompanyCoordinatorCount = async () => {
  try {
    return await CompanyCoordinator.countDocuments();
  } catch (error) {
    console.error(`Error counting company coordinators: ${error.message}`);
    return 0;
  }
}
// placement cordninator count 
exports.getPlacementCoordinatorCount = async () => {
  try {
    return await PlacementCoordinator.countDocuments();
  } catch (error) {
    console.error(`Error counting placement coordinators: ${error.message}`);
    return 0;
  }
}
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users: ' + err.message });
  }
};

exports.getUserByIdme = async (req, res) => {
    try {
      const userId = req.user.id; // Get the user ID from the request object
      const user = await User.findById(userId).select('-password'); // Exclude sensitive data like password
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  };
// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    let user;
    user = await Student.findById(req.params.id)
      .populate('college','name phoneno')
      .catch(() => Student.findById(req.params.id));
    if (!user) user = await PlacementCoordinator.findById(req.params.id)
      .catch(() => PlacementCoordinator.findById(req.params.id));
    if (!user) user = await CompanyCoordinator.findById(req.params.id)
      .catch(() => CompanyCoordinator.findById(req.params.id));
    if (!user) user = await Admin.findById(req.params.id)
      .catch(() => Admin.findById(req.params.id));
    if (!user) user = await PlacementCellAdmin.findById(req.params.id)
      .catch(() => PlacementCellAdmin.findById(req.params.id));
    if (!user) user = await User.findById(req.params.id)
      .catch(() => User.findById(req.params.id));
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user: ' + err.message });
  }
};


// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password, role,  } = req.body; // Ensure you extract all necessary fields

  try {
    let UserModel;

    // Determine which model to use based on the role
    switch (role) {
      case 'student':
        UserModel = Student;
        break;
      case 'placementcell-coordinator':
        UserModel = PlacementCoordinator;
        break;
      case 'company-coordinator':
        UserModel = CompanyCoordinator;
        break;
      case 'admin':
        UserModel = Admin;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if a user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserModel({ 
      ...req.body, // Spread the rest of the fields from the request body
      password: hashedPassword, // Assign the hashed password
      role // Ensure the role is included
    });

    await user.save(); // Save the user to the database
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ message: 'Error creating user: ' + err.message });
  }
};


// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    let user;
    user = await User.findById(req.params.id)
      .catch(() => Student.findById(req.params.id));
    if (!user) user = await PlacementCoordinator.findById(req.params.id)
      .catch(() => PlacementCoordinator.findById(req.params.id));
    if (!user) user = await CompanyCoordinator.findById(req.params.id)
      .catch(() => CompanyCoordinator.findById(req.params.id));
    if (!user) user = await Admin.findById(req.params.id)
      .catch(() => Admin.findById(req.params.id));
    if (!user) user = await PlacementCellAdmin.findById(req.params.id)
      .catch(() => PlacementCellAdmin.findById(req.params.id));

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Error updating user: ' + err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    let result;
    result = await Student.findByIdAndDelete(req.params.id)
      .catch(() => Student.findByIdAndDelete(req.params.id));
    if (!result) result = await PlacementCoordinator.findByIdAndDelete(req.params.id)
      .catch(() => PlacementCoordinator.findByIdAndDelete(req.params.id));
    if (!result) result = await CompanyCoordinator.findByIdAndDelete(req.params.id)
      .catch(() => CompanyCoordinator.findByIdAndDelete(req.params.id));
    if (!result) result = await Admin.findByIdAndDelete(req.params.id)
      .catch(() => Admin.findByIdAndDelete(req.params.id));
    if (!result) result = await PlacementCellAdmin.findByIdAndDelete(req.params.id)
      .catch(() => PlacementCellAdmin.findByIdAndDelete(req.params.id));
    
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user: ' + err.message });
  }
};

//get college by user id
exports.getCollegeByUserId = async (req, res) => {
  try {
    let user;
    user = await Student.findById(req.params.id)
      .populate('college','collegename phoneno')
      .catch(() => Student.findById(req.params.id));
    if (!user) user = await PlacementCoordinator.findById(req.params.id)
      .populate('college','name contactNumber')
    .catch(() => PlacementCoordinator.findById(req.params.id));
    if (!user) user = await CompanyCoordinator.findById(req.params.id)
      .populate('college','name contactNumber')
      .catch(() => CompanyCoordinator.findById(req.params.id));
  
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.college);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving college: ' + err.message });
  }
};

// Toggle hold/unhold a user
exports.holdUnholdUser = async (req, res) => {
  try {
    let user;
    user = await Student.findById(req.params.id)
      .catch(() => Student.findById(req.params.id));
    if (!user) user = await PlacementCoordinator.findById(req.params.id)
      .catch(() => PlacementCoordinator.findById(req.params.id));
    if (!user) user = await CompanyCoordinator.findById(req.params.id)
      .catch(() => CompanyCoordinator.findById(req.params.id));
    if (!user) user = await Admin.findById(req.params.id)
      .catch(() => Admin.findById(req.params.id));
    if (!user) user = await PlacementCellAdmin.findById(req.params.id)
      .catch(() => PlacementCellAdmin.findById(req.params.id));

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = user.status === 0 ? 1 : 0; // Toggle between hold (0) and active (1)
    await user.save();
    res.json({ message: `User status changed to ${user.status === 0 ? 'Hold' : 'Active'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling user status: ' + err.message });
  }
};

// Verify a user (set status to 1 if not already)
exports.verifyuser = async (req, res) => {
  try {
    let user;
    user = await Student.findById(req.params.id)
      .catch(() => Student.findById(req.params.id));
    if (!user) user = await PlacementCoordinator.findById(req.params.id)
      .catch(() => PlacementCoordinator.findById(req.params.id));
    if (!user) user = await CompanyCoordinator.findById(req.params.id)
      .catch(() => CompanyCoordinator.findById(req.params.id));
    if (!user) user = await Admin.findById(req.params.id)
      .catch(() => Admin.findById(req.params.id));
    if (!user) user = await PlacementCellAdmin.findById(req.params.id)
      .catch(() => PlacementCellAdmin.findById(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = user.status === 2 ? 1 : 2;
      
    await user.save();
    res.json({ message: 'User verified successfully', user });
  }
  catch (err) {
    res.status(500).json({ message: 'Error verifying user: ' + err.message });
  }

};

// Upload Profile Image
exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ msg: 'No file uploaded' });
        }

        // Assuming req.user.id is available from authentication middleware
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }

        // Update user profile with the uploaded image's file ID
        user.profileImage = req.file.id; // Store the file ID from GridFS
        await user.save();

        res.status(200).send({ msg: 'Profile image uploaded successfully', fileId: req.file.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Server error' });
    }
};

// Get Profile Image by File ID
exports.getProfileImage = (req, res) => {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.fileId) }, (err, file) => {
        if (err || !file) {
            return res.status(404).send({ msg: 'File not found' });
        }

        const readstream = gfs.createReadStream(file._id);
        readstream.pipe(res);
    });
};


exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; 

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password); // Note: currentPassword first, user.password second
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash and save the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash new password
    user.password = hashedPassword; // Assign new hashed password
    await user.save(); // Save the user instance with the updated password

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
