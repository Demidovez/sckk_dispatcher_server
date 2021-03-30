const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const config = require("../config/config");
const Model = require("./model/Model");
const Helper = require("../helper/helper");

// Определяем объект, где лежат все модели БД
const model = new Model();

const RESULT = {
  ADDED: 0,
  ERROR: 1,
  DELETED: 2,
  EDITED: 3,
};

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

    this.model_problems_users = this.createdConnection.define(
      config.PROBLEMS_USERS_TABLE,
      model.getProblemsUsersModel()
    );

    // Проводим синхронизацию с БД
    this.createdConnection.sync().catch((err) => console.log(err));
  }

  // Метод для сохранения проблемы в БД в таблицу problems
  async addProblem(problemData) {
    const {
      name,
      text,
      reason,
      comment,
      owner,
      area,
      problem_code,
      date,
      is_done,
    } = problemData;

    let result = await this.model_problems
      .create({
        name: name,
        text: text,
        reason: reason,
        comment: comment,
        owner: owner,
        area: area,
        problem_code: problem_code,
        date: date,
        is_done: is_done,
        is_hide: false,
      })
      .then(() => ({ result: RESULT.ADDED }))
      .catch(() => ({ result: RESULT.ERROR }));

    return result;
  }

  // Обновляем проблему
  async editProblem(problem) {
    const {
      id,
      name,
      text,
      reason,
      comment,
      owner,
      area,
      problem_code,
      date,
      is_done,
    } = problem;

    let result = await this.model_problems
      .update(
        {
          name: name,
          text: text,
          reason: reason,
          comment: comment,
          owner: owner,
          area: area,
          problem_code: problem_code,
          date: date,
          is_done: is_done,
        },
        {
          where: {
            id: id,
          },
        }
      )
      .then((r) => ({ result: RESULT.EDITED }))
      .catch(() => ({ result: RESULT.ERROR }));

    return result;
  }

  // Удаляем проблему по ID
  async deleteProblem(problemId) {
    let result = await this.model_problems
      .update(
        { is_hide: true },
        {
          where: {
            id: problemId,
          },
        }
      )
      .then(() => ({ result: RESULT.DELETED }))
      .catch(() => ({ result: RESULT.ERROR }));

    return result;
  }

  // Достаем все проблемы
  async getAllProblems(searchData, offset = 0) {
    const {
      searchStr,
      isActual,
      isDone,
      orderValue,
      fromDate,
      toDate,
      areas,
      problemCodes,
    } = searchData;

    let { rows, count } = await this.model_problems
      .findAndCountAll({
        where: {
          searchStr: Sequelize.where(
            Sequelize.fn("concat", ...Helper.defineWhereColumnsSearch()),
            {
              [Op.like]: "%" + searchStr.toLowerCase() + "%",
            }
          ),
          date: {
            [Op.between]: [
              fromDate ? fromDate : new Date("2000-01-01"),
              toDate ? toDate : new Date("2200-01-01"),
            ],
          },
          area: areas.length ? { [Op.in]: areas } : { [Op.ne]: -1 },
          problem_code: problemCodes.length
            ? { [Op.in]: problemCodes }
            : { [Op.ne]: -1 },
          is_done:
            (isDone && isActual) || (!isDone && !isActual)
              ? { [Op.ne]: -1 }
              : isDone || !isActual,
          is_hide: false,
        },
        limit: 15,
        offset: offset ? offset : 0,
        order: orderValue ? orderValue : [["id", "DESC"]],
        attributes: [
          "id",
          "name",
          "text",
          "reason",
          "comment",
          "owner",
          "problem_code",
          "area",
          "date",
          "is_done",
        ],
      })
      .catch(() => null);

    return { problems: rows, count };
  }

  // Пытаемся залогиниться
  async getUser(login, password) {
    return {
      id: 999,
      login: "JohnDoe",
      firstname: "John",
      lastname: "Doe",
      role: "ADMIN",
      config: {},
    };
  }
}

module.exports = Database;
