"use client";
import styles from "../sign.module.css";
import { auth } from "@/app/lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "../AuthModal";
import Toast from "../Toast";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string>("");
  const handleSignIn = async () => {
    if (!password || !email) {
      setToastMessage("Something went wrong.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        setToastMessage("Invalid Email or password.");
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
        password={password}
        setPassword={setPassword}
        handleSign={handleSignIn}
        title="Login to your HabitTracker account"
        btnText="Login"
        isRegisterPage={false}
      />
      <div className={styles.forgot_link}>
        Forgot your password? <a>Reset password</a>
      </div>
      {toastMessage && (
        <Toast
          toastMessage={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};
export default Login;
