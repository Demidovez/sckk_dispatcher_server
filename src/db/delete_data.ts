import sql from "mssql";
import QUERIES from "./queries";

export const deleteProblem = async (id: number) => {
  try {
    await sql.connect(process.env.SQL_STRING);

    await sql.query(QUERIES.deleteProblem(id));
  } catch (err) {
    console.log(err);
  }
};
