import { formatSQLDate } from "../helpers/helpers";
import { IProblem, ISearch } from "../types/types";

export default {
  allProblems: (search: ISearch) => `
    SELECT 
       [id]
      ,[name]
      ,[text]
      ,[reason]
      ,[comment]
      ,[owner]
      ,[problem_code]
      ,[area]
      ,[date]
      ,[is_done]
    FROM [Apps].[dbo].[dispatcher_problems] 
    WHERE 
        is_remove = 0 AND
        (is_done = ${+search.isDone} OR is_done = ${+!search.isActual}) AND 
        CAST(date as Date) >= CAST('${formatSQLDate(
          search.fromDate,
          "2015-01-01"
        )}' as Date) AND 
        CAST(date as Date) <= CAST('${formatSQLDate(search.toDate)}' as Date)
    `,
  editProblem: (problem: IProblem) => `
    UPDATE [Apps].[dbo].[dispatcher_problems]
    SET
       [name]  = N'${problem.name}'
      ,[text] = N'${problem.text}'
      ,[reason] = N'${problem.reason}'
      ,[comment] = N'${problem.comment}'
      ,[owner] = N'${problem.owner}'
      ,[problem_code] = N'${problem.problem_code}'
      ,[area] = N'${problem.area}'
      ,[date] = N'${problem.date}'
      ,[is_done] = ${+problem.is_done}
    WHERE id = ${problem.id}
    `,
  addProblem: (problem: IProblem) => `
    INSERT INTO [Apps].[dbo].[dispatcher_problems] (name, text, reason, comment, owner, problem_code, area, date, is_done)
    VALUES (
      N'${problem.name}', 
      N'${problem.text}', 
      N'${problem.reason}', 
      N'${problem.comment}', 
      N'${problem.owner}', 
      N'${problem.problem_code}', 
      N'${problem.area}', 
      N'${problem.date}', 
      ${+problem.is_done}
    );  
  `,
  deleteProblem: (id: number) => `
    UPDATE [Apps].[dbo].[dispatcher_problems] SET is_remove = 1 WHERE id = ${id};
  `,
};
