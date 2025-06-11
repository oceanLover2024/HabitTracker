import { RxCrossCircled } from "react-icons/rx";
import styles from "./Toast.module.css";
import { useEffect } from "react";
type ToastProps = {
  toastMessage: string;
  onClose: () => void;
};
const Toast = ({ toastMessage, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.text_wrapper}>
        <RxCrossCircled className={styles.icon} />
        <div className={styles.text}>{toastMessage}</div>
      </div>
    </div>
  );
};
export default Toast;
