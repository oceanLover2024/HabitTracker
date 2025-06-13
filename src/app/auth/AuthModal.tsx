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
  const [noEmail, setNoEmail] = useState<boolean>(false);
  const [noPassword, setNoPassword] = useState<boolean>(false);
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
      setNoEmail(false);
    } else {
      setNoEmail(true);
    }
  };
  const changePassword = (password: string) => {
    setPassword(password);
    if (password) {
      setNoPassword(false);
    } else {
      setNoPassword(true);
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
                noPassword
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
            {noPassword ? "Please enter your password" : ""}
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
