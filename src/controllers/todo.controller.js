const todoService = require('../services/todo.service');
// const Todo = require('../models.todo/todo');

// const get = async (req, res) => {
//   const todos = await todoService.getAll();

//   res.send(todos.map((todo) => todoService.normalize(todo)));
// };

const get = async (req, res) => {
  try {
    const todos = await todoService.Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const todo = await todoService.getById(id);

  if (!todo) {
    res.sendStatus(404);
    return;
  }

  res.send(todoService.normalize(todo));
};

const create = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.sendStatus(422);
  }

  const todo = await todoService.create(title);

  res.statusCode = 201;

  res.send(todo);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await todoService.getById(id.toString());

  if (!todo) {
    res.sendStatus(404);
    return;
  }

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    res.sendStatus(422);
    return;
  }

  await todoService.update({ id, title, completed });

  const updatedTodo = await todoService.getById(id);

  res.send(updatedTodo);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await todoService.getById(id))) {
    res.sendStatus(404);
    return;
  }

  await todoService.remove(id);

  res.sendStatus(204);
};

const removeMany = (req, res, next) => {
  if (req.query.action !== 'delete') {
    next();
    return;
  }

  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.sendStatus(422);
  }

  if (!ids.every((id) => todoService.getById(id))) {
    throw new Error();
  }

  todoService.removeMany(ids);

  return res.sendStatus(204);
};

const updateMany = (req, res) => {
  if (req.query.action !== 'update') {
    next();
    return;
  }

  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }
  const errors = [];
  const results = [];

  for (const { id, title, completed } of items) {
    const todo = todoService.getById(id);

    if (!todo) {
      errors.push({ id, title, completed, error: 'Not found' });
    } else {
      const result = todoService.update({ id, title, completed });
      results.push(result);
    }
  }

  return res.status(200).json({ errors, results });
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
  removeMany,
  updateMany,
};

// const getExpenses = (req, res) => {
//   const { userId, categories, from, to } = req.query;
//   const expenses = expensesService.getExpenses(userId, categories, from, to);

//   res.status(200).json(expenses);
// };

// const getExpenses = (userId, categories = [], from, to) => {
//   let filteredExpenses = [...expenses];

//   if (userId) {
//     const id = +userId;

//     filteredExpenses = filteredExpenses.filter(
//       (expense) => expense.userId === id,
//     );
//   }

//   if (categories.length > 0) {
//     const categoriesList = categories.split(',');

//     filteredExpenses = filteredExpenses.filter((expense) =>
//       categoriesList.includes(expense.category),
//     );
//   }

//   if (from) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) => new Date(expense.spentAt) >= new Date(from),
//     );
//   }

//   if (to) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) => new Date(expense.spentAt) <= new Date(to),
//     );
//   }

//   return filteredExpenses;
// };
