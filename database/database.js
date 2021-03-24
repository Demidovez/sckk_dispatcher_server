const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const config = require("../config/config");
const Model = require("./model/Model");

// Определяем объект, где лежат все модели БД
const model = new Model();

class Database {
  constructor() {
    // Настраиваем подключение
    this.createdConnection = new Sequelize(
      config.DB,
      config.USER_DB,
      config.PASSWORD_DB,
      {
        dialect: config.DIALECT_DB,
        host: config.HOST_DB,
        define: {
          chartset: "utf8mb4",
          collate: "utf8mb4_general_ci",
          timestamps: false,
        },
      }
    );

    // Определяем модель таблицы problems
    this.model_problems = this.createdConnection.define(
      config.PROBLEMS_TABLE,
      model.getProblemsModel()
    );

    // Проводим синхронизацию с БД
    this.createdConnection.sync().catch((err) => console.log(err));
  }

  // Метод для сохранения проблемы в БД в таблицу problems
  insertNewProblem(problem) {
    this.model_problems.create(problem).catch((err) => console.log(err));
  }

  // Достаем все проблемы
  async getAllProblems() {
    let { rows, count } = await this.model_problems
      .findAndCountAll({
        where: {},
        limit: 15,
        offset: 0,
        order: [["id", "DESC"]],
      })
      .catch(() => null);

    return { problems: rows, count };
  }
}

module.exports = Database;
