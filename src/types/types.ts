export interface IProblem {
  id: number;
  name: string;
  text: string;
  reason: string;
  comment: string;
  owner: string;
  problem_code: string;
  area: string;
  date: string;
  is_done: boolean;
}

export interface ISearch {
  searchStr: string;
  isActual: boolean;
  isDone: boolean;
  orderValue: string;
  fromDate: string;
  toDate: string;
  areas: string[];
  problemCodes: string[];
}

export enum RESULT {
  ok,
  error,
  idle,
}

export const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
