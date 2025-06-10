import { Note } from "./noteType";
import styles from "./NotesCard.module.css";
import { FiTrash } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
type NotesCardProps = {
  notes: Note[];
  setEditNote: (note: Note) => void;
  handleDeleteNote: (noteId: string) => void;
};
const NotesCard = ({
  notes,
  setEditNote,
  handleDeleteNote,
}: NotesCardProps) => {
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className={styles.note_wrapper}>
          <div className={styles.first_line_wrapper}>
            <div className={styles.date}>{note.date}</div>
            <div className={styles.icons_wrapper}>
              <BsPencil
                className={styles.edit}
                onClick={() => {
                  setEditNote(note);
                }}
              />
              <FiTrash
                className={styles.delete}
                onClick={() => handleDeleteNote(note.id)}
              />
            </div>
          </div>
          <div>{note.content}</div>
        </div>
      ))}
    </>
  );
};
export default NotesCard;
