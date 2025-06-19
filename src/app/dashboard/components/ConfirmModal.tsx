import PasswordInput from "@/app/auth/components/PasswordInput";
import styles from "./CreateModal.module.css";
import { Dispatch, SetStateAction } from "react";
type ConfirmModalProps = {
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
  yes: string;
  isAuthenticate?: boolean;
  password?: string | "";
  setPassword?: Dispatch<SetStateAction<string>>;
  isRegisterPage?: boolean;
};
const ConfirmModal = ({
  title,
  content,
  onClose,
  onConfirm,
  yes,
  isAuthenticate,
  password,
  setPassword,
  isRegisterPage,
}: ConfirmModalProps) => {
  return (
    <div className={styles.outer}>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.yes_no_modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.title_btn}>
            <div className={styles.title_text}>{title}</div>
            <button className={styles.x} onClick={onClose}>
              ✕
            </button>
          </div>
          <div className={styles.form_wrapper}>
            <div className={styles.yes_No_text}>{content}</div>
            <div className={styles.yes_No_wrapper}>
              {isAuthenticate && setPassword ? (
                <div style={{ marginBottom: "1rem" }}>
                  <PasswordInput
                    password={password ?? ""}
                    setPassword={setPassword}
                    isRegisterPage={isRegisterPage ?? false}
                  />
                </div>
              ) : (
                ""
              )}{" "}
              <button className={styles.yes_btn} onClick={onConfirm}>
                {yes}
              </button>
              <button className={styles.no_btn} onClick={onClose}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
