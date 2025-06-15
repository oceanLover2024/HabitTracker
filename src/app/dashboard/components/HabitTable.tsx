"use client";
import styles from "./HabitTable.module.css";
import { FaCheck } from "react-icons/fa6";
import { Habit, Check } from "./type/habitType";
import { Dispatch, SetStateAction, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FiTrash } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { MdOutlineArchive } from "react-icons/md";
import useDrag from "@/app/lib/hooks/useDrag";
import { useAuth } from "@/app/contexts/AuthContext";
type Props = {
  year: number;
  month: number;
  today: Date;
  habits: Habit[];
  check: Check;
  setHabits: Dispatch<SetStateAction<Habit[]>>;
  setDeleteHabitId: Dispatch<SetStateAction<string | null>>;
  setEditHabit: Dispatch<SetStateAction<Habit | null>>;
  setArchiveHabitId: Dispatch<SetStateAction<string | null>>;
  toggleCheck: (habitId: string, day: string) => void;
};
const week = ["S", "M", "T", "W", "T", "F", "S", "S"];
const HabitTable = ({
  year,
  month,
  today,
  habits,
  check,
  toggleCheck,
  setHabits,
  setDeleteHabitId,
  setEditHabit,
  setArchiveHabitId,
}: Props) => {
  const { user } = useAuth();
  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const daysInMonth = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => i + 1
  );
  const achieved_count = (habitId: string): number => {
    const checkDays = check[habitId];
    if (!checkDays) return 0;
    return Object.values(checkDays).filter((v) => v).length;
  };
  const achieve_goal = (habit: Habit) => achieved_count(habit.id) >= habit.goal;
  const [hoverId, setHoverId] = useState<string | null>(null);
  const { handleDragStart, handleDragOver, handleDrop } = useDrag(
    habits,
    setHabits,
    user?.uid || ""
  );
  if (!user) return;
  return (
    <>
      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                rowSpan={2}
                style={{ width: "130px" }}
                className={`${styles.habits_text} ${styles.sticky_col}`}
              >
                Habits
              </th>
              {daysInMonth.map((day) => {
                const date = new Date(year, month, day);
                const isToday =
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();
                const weekday = week[new Date(year, month, day).getDay()];
                return (
                  <th key={`w-${day}`} className={isToday ? styles.today : ""}>
                    <div
                      className={`${styles.weekday} ${
                        isToday ? styles.day_today : ""
                      }`}
                    >
                      {weekday}
                    </div>
                  </th>
                );
              })}

              <th
                rowSpan={2}
                className={styles.goal_title}
                style={{ width: "55px" }}
              >
                Goal
              </th>
              <th
                rowSpan={2}
                className={styles.achieved_title}
                style={{ width: "80px" }}
              >
                Achieved
              </th>
            </tr>
            <tr>
              {daysInMonth.map((day) => {
                const date = new Date(year, month, day);
                const isToday =
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();
                return (
                  <th key={day} className={isToday ? styles.today : ""}>
                    <div className={styles.day}>{day}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {habits.length > 0 ? (
              habits.map((habit, rowIndex) => (
                <tr
                  key={habit.id}
                  draggable={true}
                  onDragStart={() => handleDragStart(habit.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, habit.id)}
                >
                  <td
                    className={styles.sticky_col}
                    onMouseEnter={() => setHoverId(habit.id)}
                    onMouseLeave={() => setHoverId(null)}
                  >
                    {hoverId === habit.id ? (
                      <div className={styles.icons_wrapper}>
                        <CiMenuBurger className={styles.drag} />
                        {!habit.archiveDate && (
                          <BsPencil
                            onClick={() => setEditHabit(habit)}
                            className={styles.icon}
                          />
                        )}

                        <FiTrash
                          onClick={() => setDeleteHabitId(habit.id)}
                          className={styles.icon}
                        />
                        {!habit.archiveDate && (
                          <MdOutlineArchive
                            onClick={() => setArchiveHabitId(habit.id)}
                            className={styles.icon}
                          />
                        )}
                      </div>
                    ) : (
                      habit.name
                    )}
                  </td>
                  {daysInMonth.map((day) => {
                    const date = new Date(year, month, day);
                    const isToday =
                      date.getFullYear() === today.getFullYear() &&
                      date.getMonth() === today.getMonth() &&
                      date.getDate() === today.getDate();
                    const isLastRow = rowIndex === habits.length - 1;
                    const dateStr = new Date(
                      year,
                      month,
                      day
                    ).toLocaleDateString("sv-SE");
                    const isChecked = check[habit.id]?.[dateStr] ?? false;
                    const afterArchiveDate =
                      habit.archiveDate && dateStr >= habit.archiveDate;

                    return (
                      <td
                        key={day}
                        className={`${styles.cell} ${
                          isChecked ? styles.checked : ""
                        } ${isToday ? styles.today_col_border : ""}
                        ${
                          isLastRow && isToday ? styles.today_bottom_border : ""
                        }
                        ${isChecked ? styles[`checked_${rowIndex % 3}`] : ""}
                        ${afterArchiveDate ? styles.disabled_cell : ""}
                        `}
                        onClick={() => {
                          if (!afterArchiveDate)
                            toggleCheck(habit.id, String(dateStr));
                        }}
                      >
                        {isChecked ? (
                          <FaCheck className={styles.facheck} />
                        ) : (
                          ""
                        )}
                      </td>
                    );
                  })}
                  <td>{habit.goal}</td>

                  <td
                    className={achieve_goal(habit) ? styles.achieve_goal : ""}
                  >
                    {achieved_count(habit.id)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={daysInMonth.length + 3}
                  className={styles.no_habit}
                >
                  Create your first habit by clicking on + New Habit
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default HabitTable;
