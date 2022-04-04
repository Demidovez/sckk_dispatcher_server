export const getKvartalNumber = (month: number): number => {
  return Math.ceil(month / 3);
};

export const formatSQLDate = (dateStr: string, defaultStr?: string): string => {
  const date = dateStr ? new Date(dateStr) : new Date(defaultStr || new Date());

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
