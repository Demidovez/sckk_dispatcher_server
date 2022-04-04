import sql from "mssql";
import { IProblem, ISearch } from "../types/types";
import QUERIES from "./queries";

export const allProblems = async (searchData: ISearch): Promise<IProblem[]> => {
  let problems: IProblem[] = [];

  try {
    await sql.connect(process.env.SQL_STRING);

    const result = await sql.query(QUERIES.allProblems(searchData));

    problems = result.recordset.filter((problem: IProblem) => {
      const existArea =
        searchData.areas.length > 0
          ? searchData.areas.includes(problem.area)
          : true;
      const existProblemCode =
        searchData.problemCodes.length > 0
          ? searchData.problemCodes.includes(problem.problem_code)
          : true;
      const hasStr = searchData.searchStr
        ? Object.values(problem).join(" ").includes(searchData.searchStr)
        : true;

      return existArea || existProblemCode || hasStr;
    });
  } catch (err) {
    console.log(err);
  }

  return problems;
};
