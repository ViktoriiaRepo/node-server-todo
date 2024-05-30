const { sequelize } = require('../db');
const { DataTypes, Op } = require('sequelize');

const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'todos',
  }
);

const normalize = ({ id, title, completed }) => {
  return {
    id,
    title,
    completed,
  };
};

const getAll = async () => {
  const result = await Todo.findAll({
    order: [['createdAt', 'ASC']],
  });

  return result;
};

const getById = async (id) => {
  return await Todo.findByPk(id);
};

const create = async (title) => {
  return await Todo.create({ title });
};

const update = async ({ id, title, completed }) => {
  await Todo.update({ title, completed }, { where: { id } });
};

const remove = async (id) => {
  await Todo.destroy({
    where: {
      id,
    },
  });
};

function isUUID(id) {
  const pattern = /^[0-9a-f\-]+$/;

  return pattern.test(id);
}

const removeMany = async (ids) => {
  await Todo.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};

const updateMany = async (todos) => {
  return await sequelize.transaction(async (t) => {
    for (const { id, title, completed } of todos) {
      await Todo.update(
        { title, completed },
        { where: { id }, transaction: t }
      );
    }
  });
};

module.exports = {
  Todo,
  getAll,
  getById,
  create,
  update,
  remove,
  removeMany,
  updateMany,
  normalize,
};
