import sequelize from "../utils/sequelize.js";
import { DataTypes, Sequelize } from "sequelize";
const Users = sequelize.define(
  "Users",
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pass_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
export default Users;
