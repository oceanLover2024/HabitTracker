"use client";
import styles from "../sign.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
type PasswordInputProps = {
  password: string | "";
  setPassword: Dispatch<SetStateAction<string>>;
  isRegisterPage: boolean;
};
const PasswordInput = ({
  password,
  setPassword,
  isRegisterPage,
}: PasswordInputProps) => {
  const [noPassword, setNoPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const changePassword = (password: string) => {
    setPassword(password);
    if (password) {
      setNoPassword(false);
    } else {
      setNoPassword(true);
    }
  };
  return (
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
            noPassword ? styles.error_input_style : styles.correct_input_style
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
  );
};
export default PasswordInput;
