const Sequelize = require("sequelize");

class Model {
  getProblemsModel() {
    return {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      owner: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      problem_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      area: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_hide: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    };
  }

  getProblemsUsersModel() {
    return {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      lastname: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      role: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      config: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    };
  }
}

module.exports = Model;
