const Sequelize = require("sequelize");

class Helper {
  static correctArray(array) {}
  static defineWhereColumnsSearch() {
    const whereColumns = [
      Sequelize.fn("lower", Sequelize.col("id")),
      " ",
      Sequelize.fn("lower", Sequelize.col("name")),
      " ",
      Sequelize.fn("lower", Sequelize.col("text")),
      " ",
      Sequelize.fn("lower", Sequelize.col("reason")),
      " ",
      Sequelize.fn("lower", Sequelize.col("comment")),
      " ",
      Sequelize.fn("lower", Sequelize.col("owner")),
      " ",
      Sequelize.fn("lower", Sequelize.col("problem_code")),
      " ",
      Sequelize.fn("lower", Sequelize.col("area")),
      " ",
      Sequelize.fn("lower", Sequelize.col("date")),
    ];

    return whereColumns;
  }
}

module.exports = Helper;
