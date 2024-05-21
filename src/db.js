// const { Client } = require('pg');
// const { Sequelize } = require('sequelize');

// require('dotenv').config();

// // const sequelize = new Sequelize(
// //   'postgres',
// //   process.env.DB_USERNAME,
// //   process.env.DB_PASSWORD,
// //   {
// //     host: process.env.DB_HOST,
// //     dialect: 'postgres',
// //   }
// // );

const { Sequelize } = require('sequelize');

require('dotenv').config();

const dbURL = process.env.DATABASE_URL;

const sequelize = new Sequelize(dbURL, {
  dialectOptions: {
    ssl: true,
  },
});

module.exports = { sequelize };
