import { useState } from "react";

const useMonth = () => {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const handleChangeMonth = (year: number, month: number) => {
    setMonth(month);
    setYear(year);
  };
  return { today, month, year, handleChangeMonth };
};
export default useMonth;
