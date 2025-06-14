"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import HabitTable from "./components/HabitTable";
import MonthSelector from "./components/MonthSelector";
import NoteSection from "./components/note/NoteSection";
import { Habit } from "./components/type/habitType";
import {
  addHabitToDB,
  archiveHabitFromDB,
  deleteHabitFromDB,
  editHabitFromDB,
  toggleCheckDayToDB,
} from "../services/habitService";
import ConfirmModal from "./components/ConfirmModal";
import CreateModal from "./components/CreateModal";
import Add_btn from "../components/Add_btn";
import useMonth from "../lib/hooks/useMonth";
import useHabits from "../lib/hooks/useHabits";
const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { today, month, year, handleChangeMonth } = useMonth();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [deleteHabitId, setDeleteHabitId] = useState<string | null>(null);
  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [archiveHabitId, setArchiveHabitId] = useState<string | null>(null);
  const { check, setCheck, habits, setHabits } = useHabits(user?.uid);
  const toggleCheck = async (habitId: string, dateStr: string) => {
    if (!user) return;
    await toggleCheckDayToDB(user.uid, habitId, dateStr);
    setCheck((prev) => ({
      ...prev,
      [habitId]: { ...prev[habitId], [dateStr]: !prev[habitId]?.[dateStr] },
    }));
  };
  const addHabit = async (name: string, goal: number) => {
    if (!user) return;
    const newHabit = await addHabitToDB(user.uid, name, goal);
    setHabits((prev) => [...prev, newHabit]);
  };
  const handleDeleteHabit = async (id: string) => {
    if (!user) return;
    await deleteHabitFromDB(user.uid, id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setDeleteHabitId(null);
  };
  const handleEditHabit = async (updatedHabit: Habit) => {
    if (!user) return;
    await editHabitFromDB(user.uid, updatedHabit);
    setHabits((prev) =>
      prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
    );
    setEditHabit(null);
  };
  const handleArchive = async (habitId: string) => {
    if (!user) return;
    const todayStr = new Date().toISOString().slice(0, 10);
    await archiveHabitFromDB(user.uid, habitId, todayStr);
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, archiveDate: todayStr } : h))
    );
    setArchiveHabitId(null);
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth/login");
      return;
    }
  }, [user, isLoading, router]);
  if (isLoading) return null;
  if (!user) return null;
  return (
    <div>
      <MonthSelector
        year={year}
        month={month}
        handleChangeMonth={handleChangeMonth}
      />
      <HabitTable
        year={year}
        month={month}
        today={today}
        habits={habits}
        check={check}
        toggleCheck={toggleCheck}
        setHabits={setHabits}
        setDeleteHabitId={setDeleteHabitId}
        setEditHabit={setEditHabit}
        setArchiveHabitId={setArchiveHabitId}
      />
      {deleteHabitId && (
        <ConfirmModal
          onClose={() => setDeleteHabitId(null)}
          onConfirm={() => handleDeleteHabit(deleteHabitId)}
          title="Delete Habit?"
          content="Completely remove a habit from the habit tracker. This cannot be
            undone. Archive a habit if you mean to stop tracking it further."
        />
      )}
      {archiveHabitId && (
        <ConfirmModal
          onClose={() => setArchiveHabitId(null)}
          onConfirm={() => handleArchive(archiveHabitId)}
          title="Archive Habit?"
          content="Archive a habit when you want to stop tracking it from today. Archived habits cannot be unarchived."
        />
      )}
      {editHabit && (
        <CreateModal
          onClose={() => setEditHabit(null)}
          onSave={(name, goal) => handleEditHabit({ ...editHabit, name, goal })}
          habit={editHabit}
          title="Edit Habit"
        />
      )}
      <Add_btn setShowModal={setShowModal} from="Habit" />

      {showModal && (
        <CreateModal
          onClose={() => setShowModal(false)}
          onSave={addHabit}
          title="Create New Habit"
        />
      )}
      <NoteSection />
    </div>
  );
};
export default DashboardPage;
