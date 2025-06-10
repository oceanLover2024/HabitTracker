import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Habit } from "../dashboard/components/type/habitType";
export const getHabitsFromDB = async (userId: string) => {
  const habitRef = collection(db, "users", userId, "habits");
  const q = query(habitRef, orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    goal: doc.data().goal,
    checkDays: doc.data().checkDays ?? {},
    archiveDate: doc.data().archiveDate ?? "",
    order: doc.data().order,
  }));
};
export const addHabitToDB = async (
  userId: string,
  name: string,
  goal: number
) => {
  const habitRef = collection(db, "users", userId, "habits");
  const habitLength = (await getDocs(habitRef)).docs.length;
  const docRef = await addDoc(habitRef, {
    name,
    goal,
    createdAt: new Date().toISOString(),
    order: habitLength,
  });
  return { id: docRef.id, name, goal };
};
export const deleteHabitFromDB = async (userId: string, habitId: string) => {
  const habitDoc = doc(db, "users", userId, "habits", habitId);
  await deleteDoc(habitDoc);
  const snapshot = collection(db, "users", userId, "habits");
  const q = query(snapshot, orderBy("order"));
  const habitsDataArray = (await getDocs(q)).docs;
  await Promise.all(
    habitsDataArray.map((habit, index) =>
      updateDoc(doc(db, "users", userId, "habits", habit.id), { order: index })
    )
  );
};
export const editHabitFromDB = async (userId: string, updatedHabit: Habit) => {
  const habitDoc = doc(db, "users", userId, "habits", updatedHabit.id);
  await updateDoc(habitDoc, {
    name: updatedHabit.name,
    goal: updatedHabit.goal,
  });
};
export const archiveHabitFromDB = async (
  userId: string,
  habitId: string,
  todayStr: string
) => {
  const habitDoc = doc(db, "users", userId, "habits", habitId);
  await updateDoc(habitDoc, {
    archiveDate: todayStr,
  });
};
export const toggleCheckDayToDB = async (
  userId: string,
  habitId: string,
  dateStr: string
) => {
  const docRef = doc(db, "users", userId, "habits", habitId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return;
  const data = snapshot.data();
  const checkDays = data.checkDays || {};
  const theDayIsChecked = checkDays[dateStr];
  const updatedCheckDays = { ...checkDays, [dateStr]: !theDayIsChecked };
  if (!updatedCheckDays[dateStr]) delete updatedCheckDays[dateStr];
  await updateDoc(docRef, { checkDays: updatedCheckDays });
};
