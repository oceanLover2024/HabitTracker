import { useState } from "react";
import styles from "./CreateModal.module.css";
import { FaStarOfLife } from "react-icons/fa6";
import { useEscape } from "@/app/lib/hooks/useEscape";
import Toast from "@/app/components/Toast";
import { Habit } from "./type/habitType";
type CreateModalProps = {
  onClose: () => void;
  onSave: (name: string, goal: number) => void;
  title: string;
  habit?: Habit | null;
};
const CreateModal = ({ onClose, onSave, title, habit }: CreateModalProps) => {
  const [name, setName] = useState<string>(habit?.name ?? "");
  const [goal, setGoal] = useState<number | "">(habit?.goal ?? "");
  const [noName, setNoName] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const changeName = (name: string) => {
    setName(name);
    if (!name) {
      setNoName(true);
    } else {
      setNoName(false);
    }
  };

  const handleSave = () => {
    if (!name.trim() || goal === undefined || goal === null || goal === "") {
      setToastMessage("Something went wrong.");
      return;
    }
    onSave(name.trim(), Number(goal));
    setName("");
    setGoal("");
    onClose();
    setToastMessage("");
  };
  useEscape(onClose);
  return (
    <div className={styles.outer}>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.title_btn}>
            <div className={styles.title_text}>{title}</div>
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
                className={`${styles.input} ${
                  noName ? styles.error_input_style : styles.correct_input_style
                }`}
                value={name}
                onChange={(e) => changeName(e.target.value)}
              />
              <div className={styles.no_name_text}>
                {noName ? "Please enter a habit." : ""}
              </div>
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
                className={`${styles.input} ${styles.correct_input_style}`}
              />
            </div>
            <button className={styles.save_btn} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      {toastMessage && (
        <Toast
          toastMessage={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};
export default CreateModal;
