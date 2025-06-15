export type Habit = {
  id: string;
  name: string;
  goal: number;
  checkDays?: Record<string, boolean>;
  archiveDate?: string;
  order?: number;
  createdAt: string;
};
export type Check = Record<string, Record<string, boolean>>;
export type monthRate = { month: string; percent: number };
