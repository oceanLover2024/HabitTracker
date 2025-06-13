import { Dispatch, SetStateAction } from "react";
import styles from "./Add_btn.module.css";
type Add_btnProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  from: string;
};
const Add_btn = ({ setShowModal, from }: Add_btnProps) => {
  return (
    <button
      className={`${styles.btn} ${from === "Habit" ? styles.from : ""}`}
      onClick={() => setShowModal(true)}
    >
      + New {from}
    </button>
  );
};
export default Add_btn;
