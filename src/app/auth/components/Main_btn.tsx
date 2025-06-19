import styles from "../sign.module.css";
type Props = {
  handleSign: () => Promise<void>;
  btnText: string;
};
const Main_btn = ({ handleSign, btnText }: Props) => {
  return (
    <button onClick={handleSign} className={styles.btn}>
      {btnText}
    </button>
  );
};
export default Main_btn;
