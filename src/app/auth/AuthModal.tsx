"use client";
import styles from "./sign.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
type AuthModalProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleSign: () => Promise<void>;
  title: string;
  btnText: string;
  isRegisterPage: boolean;
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
}: AuthModalProps) => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nonEmail, setNonEmail] = useState<boolean>(false);
  const [nonPassword, setNonPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      setNonEmail(false);
    } else {
      setNonEmail(true);
    }
  };
  const changePassword = (password: string) => {
    setPassword(password);
    if (password) {
      setNonPassword(false);
    } else {
      setNonPassword(true);
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
              emailError || nonEmail
                ? styles.error_input_style
                : styles.correct_input_style
            }`}
          />
          <div className={styles.error_text}>
            {emailError
              ? "Please enter a valid email address"
              : nonEmail
              ? "Please enter your email"
              : ""}
          </div>
        </div>
        <div className={styles.input_wrapper}>
          <div className={styles.label_star}>
            <FaStarOfLife className={styles.star} />
            Password
          </div>
          <div className={styles.password_wrapper}>
            <input
              placeholder="Password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => changePassword(e.target.value)}
              className={`${styles.input} ${
                nonPassword
                  ? styles.error_input_style
                  : styles.correct_input_style
              }`}
            />
            <span
              className={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          <div className={styles.error_text}>
            {nonPassword ? "Please enter your password" : ""}
            {isRegisterPage
              ? password.length < 6 && password.length > 0
                ? "Password must be minimum of 6 characters"
                : ""
              : ""}
          </div>
        </div>
        <button onClick={handleSign} className={styles.btn}>
          {btnText}
        </button>
      </div>
    </div>
  );
};
export default AuthModal;
