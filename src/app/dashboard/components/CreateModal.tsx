import { useState } from "react";
import styles from "./CreateModal.module.css";
import { FaStarOfLife } from "react-icons/fa6";
import { useEscape } from "@/app/lib/hooks/useEscape";
type CreateModalProps = {
  onClose: () => void;
  onSave: (name: string, goal: number) => void;
};
const CreateModal = ({ onClose, onSave }: CreateModalProps) => {
  const [name, setName] = useState<string>("");
  const [goal, setGoal] = useState<number | "">("");
  const handleSave = () => {
    if (!name.trim() || goal === undefined || goal === null || goal === "")
      return;
    onSave(name.trim(), Number(goal));
    setName("");
    setGoal("");
    onClose();
  };
  useEscape(onClose);
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title_btn}>
          <div className={styles.title_text}>Create New Habit</div>
          <button className={styles.x} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.input_text_wrapper}>
            <label className={styles.label}>
              <FaStarOfLife className={styles.star} />
              Habit Name
            </label>
            <input
              placeholder="Eg. Exersice"
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input_text_wrapper}>
            <label className={styles.label}>
              <FaStarOfLife className={styles.star} />
              Goal
            </label>
            <input
              placeholder="Number of times to perform habit in a month"
              type="number"
              min={0}
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className={styles.input}
            />
          </div>
          <button className={styles.save_btn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateModal;
