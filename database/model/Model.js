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
      problem_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      owner: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      title: {
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
}

module.exports = Model;
