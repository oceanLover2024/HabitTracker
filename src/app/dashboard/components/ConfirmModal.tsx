import styles from "./CreateModal.module.css";
type ConfirmModalProps = {
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
};
const ConfirmModal = ({
  title,
  content,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.yes_no_modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title_btn}>
          <div className={styles.title_text}>{title}</div>
          <button className={styles.x} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.yes_No_text}>{content}</div>
          <div className={styles.yes_No_wrapper}>
            <button className={styles.yes_btn} onClick={onConfirm}>
              Yes
            </button>
            <button className={styles.no_btn} onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
