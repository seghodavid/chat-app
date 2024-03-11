const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./user");
const Message = require("./message");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: "chats",
  }
);

Chat.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Chat.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
Chat.hasMany(Message, { foreignKey: "chatId", as: "message" });

module.exports = Chat;
