
// import { Sequelize, Dialect } from 'sequelize';

// const dbDatabase = process.env.DB_DATABASE as string
// const dbUsername = process.env.DB_USERNAME as string
// const dbHost = process.env.DB_HOST
// const dbDriver = process.env.DB_DIALECT as Dialect
// const dbPort: number = parseInt(process.env.DB_PORT as string)
// const dbPassword = process.env.DB_PASSWORD

// const db = new Sequelize(dbDatabase, dbUsername, dbPassword, {
//     host: dbHost,
//     port: dbPort,
//     dialect: dbDriver
// });

// db.sync();

// export default db;

import { Sequelize } from 'sequelize';
require('dotenv').config();

export const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
});