const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database');
const User = require('./user');


const Code = sequelize.define(
  "Code",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      PrimaryKey: true,
      allowNull: false,
    },
    verificationCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

Code.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Code