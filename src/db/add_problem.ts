import { IProblem } from "../types/types";
import sql from "mssql";
import QUERIES from "./queries";

export const addProblem = async (problem: IProblem) => {
  try {
    await sql.connect(process.env.SQL_STRING);

    await sql.query(QUERIES.addProblem(problem));
  } catch (err) {
    console.log(err);
  }
};
