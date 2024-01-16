// Export a function that defines the SpamReport model
module.exports = (sequelize, DataTypes) => {
  // Define the SpamReport model
  const SpamReport = sequelize.define("SpamReport", {
    // The reporterId field is an integer and cannot be null
    reporterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    // The spammerPhone field is a string and cannot be null
    spammerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define the SpamReport model's associations
  SpamReport.associate = (models) => {
    SpamReport.belongsTo(models.USER, {
      foreignKey: "reporterId",
      as: "reporter",
    });
  };

  // Return the SpamReport model
  return SpamReport;
};
