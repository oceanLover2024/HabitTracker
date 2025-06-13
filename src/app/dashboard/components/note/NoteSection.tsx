import { Note } from "./noteType";
import styles from "./NoteSection.module.css";
import { useEffect, useState } from "react";
import NoteModal from "./NoteModal";
import NotesCard from "./NotesCard";
import EditNoteModal from "./EditNoteModal";
import {
  addNoteToDB,
  deleteNoteToDB,
  editNoteToDB,
  getNotesFromDB,
} from "@/app/services/notesService";
import { useAuth } from "@/app/contexts/AuthContext";
import Add_btn from "@/app/components/Add_btn";
const NoteSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const { user } = useAuth();
  const todayStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
    const toFetchNotes = async () => {
      if (!user) return;
      const fetchedNotes = await getNotesFromDB(user.uid);
      setNotes(fetchedNotes as Note[]);
    };
    toFetchNotes();
  }, [user]);
  const addNote = async (content: string) => {
    if (!user) return;
    const newNote = await addNoteToDB(user.uid, todayStr, content);
    setNotes((prev) => [newNote, ...prev]);
    setShowNoteModal(false);
  };
  const handleEditNote = async (updatedNote: Note) => {
    if (!user) return;
    await editNoteToDB(user.uid, updatedNote);
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
    setEditNote(null);
  };
  const handleDeleteNote = async (noteId: string) => {
    if (!user) return;
    await deleteNoteToDB(user.uid, noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.notes_title}>Notes</div>
        <Add_btn setShowModal={setShowNoteModal} from="Note" />
      </div>
      {notes.length === 0 ? (
        <div className={styles.no_note}>
          Create your first note by clicking on + New Note
        </div>
      ) : (
        <NotesCard
          notes={notes}
          setEditNote={setEditNote}
          handleDeleteNote={handleDeleteNote}
        />
      )}
      {showNoteModal && (
        <NoteModal onClose={() => setShowNoteModal(false)} onSave={addNote} />
      )}
      {editNote && (
        <EditNoteModal
          onClose={() => setEditNote(null)}
          handleEditNote={handleEditNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};
export default NoteSection;
