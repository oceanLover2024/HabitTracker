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
const NoteSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNoteModal, setShowNoteModel] = useState<boolean>(false);
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
    setShowNoteModel(false);
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
        <button
          className={styles.new_note_btn}
          onClick={() => setShowNoteModel(true)}
        >
          + New Note
        </button>
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
        <NoteModal onClose={() => setShowNoteModel(false)} onSave={addNote} />
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
