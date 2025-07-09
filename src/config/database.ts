import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_HOST = process.env.DB_HOST as string;

console.log("my pass", DB_PASSWORD);

const sequelize = new Sequelize(
  DB_NAME, DB_USER, DB_PASSWORD,
  {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // for development; set to true in production with proper certs
      },
    },
    logging: true,
  }
);

export default sequelize;
