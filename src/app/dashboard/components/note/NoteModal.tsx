import { useEscape } from "@/app/lib/hooks/useEscape";
import styles from "../CreateModal.module.css";
import { useState } from "react";
type NoteModal = { onClose: () => void; onSave: (content: string) => void };
const NoteModal = ({ onClose, onSave }: NoteModal) => {
  const [note, setNote] = useState<string>("");
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setNote(e.target.value);
  };
  useEscape(onClose);
  const handleSave = () => {
    if (!note.trim()) return;
    onSave(note.trim());
    setNote("");
    onClose();
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title_btn}>
          <div className={styles.title_text}>Create New Note</div>
          <button className={styles.x} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.form_wrapper}>
          <textarea
            className={styles.note_box}
            placeholder="Write yout thoughts"
            onChange={handleTextarea}
            value={note}
          ></textarea>
          <button className={styles.save_btn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default NoteModal;
