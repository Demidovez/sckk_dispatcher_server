const config = require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./database/database");
const cors = require("cors");
const axios = require("axios");

// Создаем веб-сервер
const app = express();

// Создаем подключение к БД
const database = new Database();

// Делаем наш парсинг в формате json
app.use(bodyParser.json());

// Добавляем дополнительные зоголовки дял запросов
app.use(cors());

// парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  Достаем из БД все проблемы
app.post("/all_problems", async (req, res) => {
  const { searchData } = req.body;

  const problems = await database.getAllProblems(searchData);

  res.json(problems);
});

//  Добавляем новую проблему
app.post("/add_problem", async (req, res) => {
  const { problemData } = req.body;

  const result = await database.addProblem(problemData);

  res.json(result);
});

//  Обновляем проблему
app.post("/edit_problem", async (req, res) => {
  const { problem } = req.body;

  const editedProblem = await database.editProblem(problem);

  res.json(editedProblem);
});

// Удаляем проблему по ID
app.post("/delete_problem", async (req, res) => {
  const { problemId } = req.body;

  const result = await database.deleteProblem(problemId);

  res.json(result);
});

// Установливаем порт, и слушаем запросы
app.listen(5000, () => {
  console.log("Сервер запущен на 5000 порту");
});
