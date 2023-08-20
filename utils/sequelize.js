import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.sql_database,
  process.env.sql_user,
  process.env.sql_password,
  {
    dialect: "postgres",
    host: "localhost",
  }
);

export default sequelize;
