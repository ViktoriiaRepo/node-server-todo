const { Client } = require('pg');
const { Sequelize } = require('sequelize');

require('dotenv').config();

// const sequelize = new Sequelize(
//   'postgres',
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   }
// );

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
  }
);

module.exports = {
  sequelize,
};
