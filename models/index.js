// Import necessary modules
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

// Initialize Sequelize with development configuration
const sequelize = new Sequelize(config.development);

// Import User and SpamReport models
const User = require("./user")(sequelize, DataTypes);
const SpamReport = require("./spamReport")(sequelize, DataTypes);

// Export models and Sequelize instance for use in other modules
module.exports = { User, SpamReport, sequelize };
