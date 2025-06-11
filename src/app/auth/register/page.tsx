"use client";
import { auth } from "@/app/lib/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "../AuthModal";
import styles from "../sign.module.css";
import Toast from "../Toast";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const router = useRouter();
  const handleRegister = async () => {
    if (!password || !email) {
      setToastMessage("Something went wrong.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        if (e instanceof FirebaseError) {
          setToastMessage("Invalid Email or password.");
        } else {
          setToastMessage("Something went wrong.");
        }
      }
    }
  };
  return (
    <div className={styles.outer}>
      <AuthModal
        title="Create your DailyHabits account"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSign={handleRegister}
        btnText="Create account"
        isRegisterPage={true}
      />
      {toastMessage && (
        <Toast
          toastMessage={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};
export default Register;
