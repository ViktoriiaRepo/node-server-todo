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

const sequelize = new Sequelize(
  'postgres://node_server_todo_db_user:sBBCCjdKzvXDiw76PhHdVNz2r50F7IgV@dpg-cp3239cf7o1s73bq9hl0-a.frankfurt-postgres.render.com/node_server_todo_db',
  {
    dialectOptions: {
      ssl: true,
    },
  }
);

module.exports = { sequelize };
