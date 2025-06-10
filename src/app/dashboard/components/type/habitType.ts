export type Habit = {
  id: string;
  name: string;
  goal: number;
  checkDays?: Record<string, boolean>;
  archiveDate?: string;
  order?: number;
};
export type Check = Record<string, Record<string, boolean>>;
