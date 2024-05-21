'use strict';
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');
const { router: todoRouter } = require('./routes/todo.route');

const app = express();

app.use(cors());

app.use('/todos', express.json(), todoRouter);

app.get('/test-connection', async (req, res) => {
  try {
    await sequelize.authenticate();
    res
      .status(200)
      .send('Connection to the database has been established successfully.');
  } catch (error) {
    res.status(500).send(`Unable to connect to the database: ${error}`);
  }
});
//http://localhost:3005/test-connection

const PORT = process.env.PORT || 3005;

// app.listen(3005, () => {
//   console.log('Server is running on port 3005');
// });

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
});
