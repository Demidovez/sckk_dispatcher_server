import express from "express";
import cors from "cors";
import { allProblems } from "./db/get_problems";
import { editProblem } from "./db/edit_problem";
import { addProblem } from "./db/add_problem";
import { deleteProblem } from "./db/delete_data";
import cookieParser from "cookie-parser";
import { generateToken, verifyToken, verifyUser } from "./auth/auth";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: [
      "http://10.1.15.244",
      "http://localhost:4000",
      "http://10.1.22.2",
      "http://uisvr",
    ],
  })
);
// Добавляем парсер Cookies
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/all_problems", async (req, res) => {
  const searchData = req.body.data;

  const problems = await allProblems(searchData);

  res.json(problems);
});

app.post("/edit_problem", verifyToken, (req, res) => {
  const day = req.body.data;

  editProblem(day)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post("/add_problem", verifyToken, (req, res) => {
  const problem = req.body.data;

  addProblem(problem)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post("/delete_problem", verifyToken, (req, res) => {
  const id = req.body.data;

  deleteProblem(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

// Пытаемся залогинить пользователя
app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (login === "admin" && password === "12345") {
    const user = {
      id: 100,
      login: "admin",
      firstname: "Администратор",
      lastname: "Системы",
      role: "administrator",
    };

    if (user) {
      const token = await generateToken(user.id);

      res.cookie("token", token, {
        secure: false,
        sameSite: "lax",
        httpOnly: false,
      });
    }

    res.json(user);
  } else {
    res.json({});
  }
});

// Пытаемся разлогинить пользователя
app.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json(true);
});

// Достаем пользователя если он есть
app.get("/get_user", verifyUser, async (req, res) => {
  try {
    const { id } = (req as any).user;

    if (id) {
      // const user = await database.getUser(id);

      const user = {
        id: 100,
        login: "admin",
        firstname: "Администратор",
        lastname: "Системы",
        role: "administrator",
      };

      res.json(user);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.json(null);
  }
});

app.listen(parseInt("" + port), function () {
  console.log(`Dispatcher Server listens on ${port} :: ${new Date()}`);
});
