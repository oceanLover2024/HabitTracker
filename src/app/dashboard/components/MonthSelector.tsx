"use client";
import styles from "./MonthSelector.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
type MonthSelectorProps = {
  month: number;
  year: number;
  handleChangeMonth: (month: number, year: number) => void;
};
const MonthSelector = ({
  month,
  year,
  handleChangeMonth,
}: MonthSelectorProps) => {
  const handlePrev = () => {
    const newDate = new Date(year, month - 1);
    handleChangeMonth(newDate.getFullYear(), newDate.getMonth());
  };
  const handleNext = () => {
    const newDate = new Date(year, month + 1);
    handleChangeMonth(newDate.getFullYear(), newDate.getMonth());
  };
  const monthNames = [
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
  return (
    <div className={styles.wrapper}>
      <FaChevronLeft onClick={handlePrev} className={styles.btn} />

      <span>
        {monthNames[month]}, {year}
      </span>
      <FaChevronRight onClick={handleNext} className={styles.btn} />
    </div>
  );
};
export default MonthSelector;
