const config = require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./database/database");
const cors = require("cors");
const axios = require("axios");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

// Ключ для авторизации
const jwtSecret = "secret123";

// Создаем веб-сервер
const app = express();

// Создаем подключение к БД
const database = new Database();

// Делаем наш парсинг в формате json
app.use(bodyParser.json());

// Добавляем дополнительные зоголовки дял запросов
app.use(cors());

// Добавляем парсер Cookies
app.use(cookieParser());

// Проверяем токен в Cookies
app.use(
  jwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.token,
  })
);

// Парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  Достаем из БД все проблемы
app.post("/all_problems", async (req, res) => {
  const { searchData, offset } = req.body;

  const problems = await database.getAllProblems(searchData, offset);

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

// Пытаемся залогинить пользователя
app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await database.getUser(login, password);

  if (user) {
    const token = jsonwebtoken.sign(user, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
  }

  res.json(user);
});

// Установливаем порт, и слушаем запросы
app.listen(5000, () => {
  console.log("Сервер запущен на 5000 порту");
});
