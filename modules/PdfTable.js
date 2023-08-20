import sequelize from "../utils/sequelize.js";
import { DataTypes, Sequelize } from "sequelize";

const PdfStore = sequelize.define(
  "PdfStore",
  {
    pdf: {
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

export default PdfStore;
