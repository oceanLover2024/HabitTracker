"use client";
import styles from "./sign.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import Main_btn from "./components/Main_btn";
import PasswordInput from "./components/PasswordInput";
type AuthModalProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleSign: () => Promise<void>;
  title: string;
  btnText: string;
  isRegisterPage: boolean;
  mode: "sign" | "reset";
};
const AuthModal = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  handleSign,
  btnText,
  isRegisterPage,
  mode,
}: AuthModalProps) => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [noEmail, setNoEmail] = useState<boolean>(false);
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const changeEmail = (email: string) => {
    const emailValidBoolean = isValidEmail(email);
    setEmail(email);
    if (email !== "") {
      if (emailValidBoolean) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    } else {
      setEmailError(false);
    }
    if (email) {
      setNoEmail(false);
    } else {
      setNoEmail(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.form}>
        <div className={styles.input_wrapper}>
          <div className={styles.label_star}>
            <FaStarOfLife className={styles.star} />
            Email Address
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            className={`${styles.input} ${
              emailError || noEmail
                ? styles.error_input_style
                : styles.correct_input_style
            }`}
          />
          <div className={styles.error_text}>
            {emailError
              ? "Please enter a valid email address"
              : noEmail
              ? "Please enter your email"
              : ""}
          </div>
        </div>
        {mode === "sign" && (
          <PasswordInput
            password={password}
            setPassword={setPassword}
            isRegisterPage={isRegisterPage}
          />
        )}
        {mode === "reset" && (
          <div className={styles.remark_text}>
            Enter your registered email to receive a link to reset your
            password.
          </div>
        )}
        <Main_btn btnText={btnText} handleSign={handleSign} />
      </div>
    </div>
  );
};
export default AuthModal;
