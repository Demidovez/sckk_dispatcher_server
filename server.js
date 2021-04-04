const config = require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./database/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  generateToken,
  verifyToken,
  verifyUser,
  clearCookie,
} = require("./helper/auth");

// Создаем веб-сервер
const app = express();

// Создаем подключение к БД
const database = new Database();

// Делаем наш парсинг в формате json
app.use(bodyParser.json());

// Добавляем дополнительные зоголовки для запросов
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4000",
      "http://10.1.22.2:5526",
      "http://10.1.22.2",
      "http://uisvr",
      "uisvr",
    ],
  })
);

// Добавляем парсер Cookies
app.use(cookieParser());

// Парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  Достаем из БД все проблемы
app.post("/all_problems", async (req, res) => {
  const { searchData, offset } = req.body;

  const problems = await database.getAllProblems(searchData, offset);

  res.json(problems);
});

//  Добавляем новую проблему
app.post("/add_problem", verifyToken, async (req, res) => {
  const { problemData } = req.body;

  const result = await database.addProblem(problemData);

  res.json(result);
});

//  Обновляем проблему
app.post("/edit_problem", verifyToken, async (req, res) => {
  const { problem } = req.body;

  const editedProblem = await database.editProblem(problem);

  res.json(editedProblem);
});

// Удаляем проблему по ID
app.post("/delete_problem", verifyToken, async (req, res) => {
  const { problemId } = req.body;

  const result = await database.deleteProblem(problemId);

  res.json(result);
});

// Пытаемся залогинить пользователя
app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await database.loginUser(login, password);

  if (user) {
    await generateToken(res, { id: user.id });
  }

  res.json(user);
});

// Пытаемся разлогинить пользователя
app.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json(true);
});

// Достаем пользователя если он есть
app.get("/get_user", verifyUser, async (req, res) => {
  const { id } = req.user;

  if (id) {
    const user = await database.getUser(id);

    res.json(user);
  } else {
    res.json(null);
  }
});

// Установливаем порт, и слушаем запросы
app.listen(5000, () => {
  console.log("Сервер запущен на 5000 порту");
});
