const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models/index");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Sync the Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced with the database.");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the defined API routes
app.use("/api", apiRoutes);

// Use the defined authentication routes
app.use("/auth", authRoutes);


// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
