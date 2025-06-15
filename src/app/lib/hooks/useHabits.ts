import { Habit } from "@/app/dashboard/components/type/habitType";
import { getHabitsFromDB } from "@/app/services/habitService";
import { useEffect, useState } from "react";
const useHabits = (userId: string | null | undefined) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [check, setCheck] = useState<Record<string, Record<string, boolean>>>(
    {}
  );
  useEffect(() => {
    if (!userId) return;
    const fetch = async () => {
      const fetchedHabits = await getHabitsFromDB(userId);
      setHabits(fetchedHabits);
      const checkObj: Record<string, Record<string, boolean>> = {};
      for (const habit of fetchedHabits) {
        checkObj[habit.id] = habit.checkDays || {};
      }
      setCheck(checkObj);
    };
    fetch();
  }, [userId]);
  return { check, setCheck, habits, setHabits };
};
export default useHabits;
