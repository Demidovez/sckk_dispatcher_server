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
app.get("/all_problems", async (req, res) => {
  const propblems = await database.getAllProblems();

  res.json(propblems);
});

// Установливаем порт, и слушаем запросы
app.listen(5000, () => {
  console.log("Сервер запущен на 5000 порту");
});
