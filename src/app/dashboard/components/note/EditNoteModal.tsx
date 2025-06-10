import { useState } from "react";
import styles from "../CreateModal.module.css";
import { Note } from "./noteType";
type EditNoteModalProps = {
  onClose: () => void;
  handleEditNote: (updatedNote: Note) => void;
  editNote: Note;
};
const EditNoteModal = ({
  onClose,
  handleEditNote,
  editNote,
}: EditNoteModalProps) => {
  const [content, setContent] = useState<string>(editNote.content);
  const handleSave = () => {
    handleEditNote({ ...editNote, content: content });
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title_btn}>
          <div className={styles.title_text}>Edit Note</div>
          <button className={styles.x} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.form_wrapper}>
          <textarea
            className={styles.note_box}
            placeholder="Write yout thoughts"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          ></textarea>
          <button className={styles.save_btn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditNoteModal;
