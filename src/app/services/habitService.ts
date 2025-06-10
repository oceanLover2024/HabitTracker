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
  }));
};
export const addHabitToDB = async (
  userId: string,
  name: string,
  goal: number
) => {
  const habitRef = collection(db, "users", userId, "habits");
  const docRef = await addDoc(habitRef, {
    name,
    goal,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, name, goal };
};
export const deleteHabitFromDB = async (userId: string, habitId: string) => {
  const habitDoc = doc(db, "users", userId, "habits", habitId);
  await deleteDoc(habitDoc);
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
