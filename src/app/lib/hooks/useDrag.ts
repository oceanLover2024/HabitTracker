import { Dispatch, SetStateAction, useState } from "react";
import { Habit } from "../../dashboard/components/type/habitType";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useDrag = (
  habits: Habit[],
  setHabits: Dispatch<SetStateAction<Habit[]>>,
  userId: string
) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (habitId: string) => setDraggedId(habitId);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = async (targetId: string) => {
    if (!draggedId || draggedId === targetId || !userId) return;
    const newOrderHabits = [...habits];
    const fromIndex = newOrderHabits.findIndex((h) => h.id === draggedId);
    const toIndex = newOrderHabits.findIndex((h) => h.id === targetId);
    const [move] = newOrderHabits.splice(fromIndex, 1);
    newOrderHabits.splice(toIndex, 0, move);
    setHabits(newOrderHabits);
    await Promise.all(
      newOrderHabits.map((habit, index) =>
        updateDoc(doc(db, "users", userId, "habits", habit.id), {
          order: index,
        })
      )
    );
  };
  return { handleDragStart, handleDragOver, handleDrop };
};
export default useDrag;
