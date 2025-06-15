import { Habit } from "@/app/dashboard/components/type/habitType";
type StatisticsProps = {
  habit: Habit;
  check: Record<string, Record<string, boolean>>;
  year: number;
  month: number;
};
const statistics = ({ habit, check, year, month }: StatisticsProps) => {
  const checkDays = check[habit.id] || {};
  const thisMonthTotalDays = new Date(year, month + 1, 0).getDate();
  const formatTime = (n: number) => (n < 10 ? `0${n}` : n);
  const thisMonthCheckDays = Object.entries(checkDays).filter(
    ([dateStr, isChecked]) =>
      isChecked &&
      new Date(dateStr).getFullYear() === year &&
      new Date(dateStr).getMonth() === month
  ).length;

  const completedGoalRate = habit.goal
    ? habit.goal >= thisMonthCheckDays
      ? Math.round((thisMonthCheckDays / habit.goal) * 100)
      : 100
    : thisMonthCheckDays
    ? 100
    : 0;

  const completedMonthRate = Math.round(
    (thisMonthCheckDays / Number(thisMonthTotalDays)) * 100
  );
  const monthStreak = () => {
    let maxStreak = 0;
    let currentStreak = 0;
    for (let day = 1; day <= thisMonthTotalDays; day++) {
      const formatDay = `${year}-${formatTime(month + 1)}-${formatTime(day)}`;
      if (checkDays[formatDay]) {
        currentStreak++;
        maxStreak = Math.max(currentStreak, maxStreak);
      } else {
        currentStreak = 0;
      }
    }
    return maxStreak;
  };

  return {
    thisMonthCheckDays,
    completedGoalRate,
    completedMonthRate,
    monthStreak,
  };
};
export default statistics;
