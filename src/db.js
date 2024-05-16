const { Client } = require('pg');
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
  'postgres',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

module.exports = {
  sequelize,
};
