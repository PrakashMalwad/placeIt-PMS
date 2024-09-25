const Company = require('../models/company'); // Adjust the path as necessary

// Create a new company
exports.createCompany = async (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming request body
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json({ message: 'Company created successfully', company });
    } catch (error) {
        console.error("Error creating company:", error); // Log the error
        res.status(400).json({ message: 'Error creating company', error: error.message });
    }
};


// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error: error.message });
    }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error: error.message });
    }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        res.status(400).json({ message: 'Error updating company', error: error.message });
    }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company', error: error.message });
    }
};
