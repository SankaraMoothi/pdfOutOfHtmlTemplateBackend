import sequelize from "../utils/sequelize.js";
import { DataTypes, Sequelize } from "sequelize";

const Template = sequelize.define(
  "Template",
  {
    template: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sampleJSON: {
      type: DataTypes.BLOB,
      allowNull: false,
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

export default Template;
