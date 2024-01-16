// Import necessary modules
const express = require("express");
const { Op } = require("sequelize");
const { User, SpamReport } = require("../models");

// Initialize an Express router
const router = express.Router();

// Define a POST route for reporting spam
router.post("/reportSpam/:userId", async (req, res) => {
  // Extract userId from request parameters
  const { userId } = req.params;
  try {
    // Find the user by primary key
    const user = await User.findByPk(userId);
    if (!user) {
      // If user is not found, return a 404 error
      return res.status(404).json({ error: "User not found" });
    }

    // Extract spammerPhone from request body
    const { spammerPhone } = req.body;

    // Check if the same user has already reported this number as spam
    const existingReport = await SpamReport.findOne({
      where: { reporterId: user.id, spammerPhone },
    });

    if (existingReport) {
      // If a report already exists, return a 400 error
      return res
        .status(400)
        .json({ error: "You have already reported this number." });
    }

    // Create a new spam report
    const newReport = await SpamReport.create({
      reporterId: user.id,
      spammerPhone,
    });

    // Return the new report
    res.json(newReport);
  } catch (error) {
    // Log the error and return a 500 error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a GET route for retrieving all spam reports
router.get("/spamReports", async (req, res) => {
  try {
    // Find all spam reports
    const reports = await SpamReport.findAll();
    // Return the reports
    res.json(reports);
  } catch (error) {
    // Log the error and return a 500 error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a GET route for searching users
router.get("/searchUsers", async (req, res) => {
  try {
    // Extract query from request query parameters
    const { query } = req.query;

    // Search users by name or phone number
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.startsWith]: query } },
          { phone: { [Op.startsWith]: query } },
          { phone: { [Op.substring]: query } },
        ],
      },
    });

    // Return the users
    res.json(users);
  } catch (error) {
    // Log the error and return a 500 error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router for use in other modules
module.exports = router;
