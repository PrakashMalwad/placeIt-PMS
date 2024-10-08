const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController"); // Adjust the path as necessary

// Create a new company
router.post("/", companyController.createCompany);

// Get all companies
router.get("/", companyController.getAllCompanies);

// Get a single company by ID
router.get("/:id", companyController.getCompanyById);

// Update a company by ID
router.put("/:id", companyController.updateCompany);

// Delete a company by ID
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
