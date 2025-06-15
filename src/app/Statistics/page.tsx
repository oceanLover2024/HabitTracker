"use client";
import { useEffect } from "react";
import MonthSelector from "../dashboard/components/MonthSelector";
import useMonth from "../lib/hooks/useMonth";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import useHabits from "../lib/hooks/useHabits";
import styles from "./page.module.css";
import statistics from "./statistics";
import GoalCircle from "./components/Circle";
import NumberStat from "./components/NumberStat";
import getMonthRates from "./components/getMonthRates";
import MonthlyLineChart from "./components/MonthlyLineChart";
const Statistics = () => {
  const monthText = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { year, month, handleChangeMonth, today } = useMonth();
  const { check, habits } = useHabits(user?.uid);

  useEffect(() => {
    if (!user && !isLoading) router.push("/auth/login");
  }, [user, isLoading, router]);
  if (!user || isLoading) return null;
  return (
    <div>
      <MonthSelector
        year={year}
        month={month}
        handleChangeMonth={handleChangeMonth}
      />
      <div className={styles.statistics_section}>
        {/*  <h2 className={styles.statistics_title}>
          Statistics for {year} {monthText[month]}
        </h2>*/}
        {habits.map((habit) => {
          const {
            thisMonthCheckDays,
            completedGoalRate,
            completedMonthRate,
            monthStreak,
          } = statistics({ habit, check, year, month });
          const streak = monthStreak();
          const monthRates = getMonthRates({ habit, year });
          return (
            <div key={habit.id} className={styles.wrapper}>
              <div className={styles.circle}>
                <div className={styles.habit_title}>
                  <h2>{habit.name}</h2>
                </div>
                <div className={styles.stat_wrapper}>
                  <div className={styles.stat_info}>
                    <NumberStat
                      numberStat={habit.goal}
                      category="Goal"
                      logo="GoGoal"
                    />
                    <NumberStat
                      numberStat={thisMonthCheckDays}
                      category="Total count"
                      logo="TfiCheckBox"
                    />
                    <NumberStat
                      numberStat={streak}
                      category="Streak"
                      logo="BsFire"
                    />
                  </div>
                  <div className={styles.stat_circle}>
                    <GoalCircle percent={completedGoalRate} title="Goal" />
                    <GoalCircle percent={completedMonthRate} title="Month" />
                  </div>{" "}
                  <MonthlyLineChart data={monthRates} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Statistics;
