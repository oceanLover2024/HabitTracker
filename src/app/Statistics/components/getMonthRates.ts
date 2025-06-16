import { Habit, monthRate } from "@/app/dashboard/components/type/habitType";
type Props = {
  year: number;
  habit: Habit;
};
const getMonthRates = ({ year, habit }: Props): monthRate[] => {
  const result: monthRate[] = [];
  for (let m = 0; m < 12; m++) {
    const completedDayCount = Object.entries(habit.checkDays ?? {}).filter(
      ([date, checked]) => {
        const dateData = new Date(date);
        return (
          checked &&
          dateData.getFullYear() === year &&
          dateData.getMonth() === m
        );
      }
    ).length;
    const isHabitCreatedBeforeMonth =
      new Date(habit.createdAt).getFullYear() < year ||
      (new Date(habit.createdAt).getFullYear() === year &&
        new Date(habit.createdAt).getMonth() <= m);

    const expected = isHabitCreatedBeforeMonth ? habit.goal : 0;

    const percent =
      habit.goal > 0
        ? completedDayCount >= habit.goal
          ? 100
          : Math.round((completedDayCount / habit.goal) * 100)
        : completedDayCount
        ? 100
        : 0;
    console.log("百分比:", percent);
    const monthStr = new Date(year, m).toLocaleDateString("en-US", {
      month: "numeric",
    });
    result.push({ month: monthStr, percent: percent });
  }
  console.log(result);
  return result;
};
export default getMonthRates;
