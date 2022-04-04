import { IProblem } from "../types/types";
import sql from "mssql";
import QUERIES from "./queries";

export const editProblem = async (problem: IProblem) => {
  try {
    await sql.connect(process.env.SQL_STRING);

    await sql.query(QUERIES.editProblem(problem));
  } catch (err) {
    console.log(err);
  }
};
