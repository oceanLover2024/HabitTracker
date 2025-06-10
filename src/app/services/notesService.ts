import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Note } from "../dashboard/components/note/noteType";

export const getNotesFromDB = async (userId: string) => {
  const notesRef = collection(db, "users", userId, "notes");
  const q = query(notesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const addNoteToDB = async (
  userId: string,
  date: string,
  content: string
) => {
  const notesRef = collection(db, "users", userId, "notes");
  const docRef = await addDoc(notesRef, {
    date: date,
    content: content,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, date: date, content: content };
};
export const editNoteToDB = async (userId: string, updatedNote: Note) => {
  const docRef = doc(db, "users", userId, "notes", updatedNote.id);
  updateDoc(docRef, { content: updatedNote.content });
};
export const deleteNoteToDB = async (userId: string, noteId: string) => {
  const docRef = doc(db, "users", userId, "notes", noteId);
  deleteDoc(docRef);
};
