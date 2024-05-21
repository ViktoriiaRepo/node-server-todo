// const { Todo } = require('./services/todo.service');

// Todo.sync({ force: true });
const { sequelize } = require('./db');
const { Todo } = require('./models.todo/todo');
const todos = require('./api/todos.json');

const seedInitialData = async () => {
  await Todo.bulkCreate(todos);
};

const setup = async () => {
  sequelize();

  await Todo.sync({ force: true });

  await seedInitialData();
};

setup();
