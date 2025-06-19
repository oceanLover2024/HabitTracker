"use client";
import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import styles from "../sign.module.css";
import AuthModal from "../AuthModal";
import Toast from "@/app/components/toast/Toast";
const ResetPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [hasReset, setHasReset] = useState<boolean>(false);
  const handleReset = async () => {
    if (!email) {
      setToastMessage("Something went wrong.");
      return;
    }
    try {
      setHasReset(false);
      await sendPasswordResetEmail(auth, email);
      setHasReset(true);

      setToastMessage("");
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        setToastMessage("Invalid Email.");
      } else {
        setToastMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className={styles.outer}>
      <AuthModal
        email={email}
        setEmail={setEmail}
        handleSign={handleReset}
        title="Forgot your password?"
        btnText="Reset Password"
        mode="reset"
        isRegisterPage={false}
        password=""
        setPassword={() => {}}
      />

      {hasReset && (
        <div className={styles.remark_text}>
          Check your email for the password reset link!
        </div>
      )}
      {toastMessage && (
        <Toast
          toastMessage={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};
export default ResetPassword;
