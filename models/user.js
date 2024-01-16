
// Export a function that defines the User model
module.exports = (sequelize, DataTypes) => {
  // Define the User model
  const User = sequelize.define("User", {
    // The name field is a string and cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The phone field is a string and cannot be null
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The email field is a string and cannot be null
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The password field is a string and cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Return the User model
  return User;
};
