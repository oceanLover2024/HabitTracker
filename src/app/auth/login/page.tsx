"use client";
import styles from "../sign.module.css";
import { auth } from "@/app/lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "../AuthModal";
import Toast from "../../components/toast/Toast";
import Link from "next/link";
const Login = () => {
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("testtest");
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
        mode="sign"
      />
      <div className={styles.remark_text}>
        Forgot your password?{" "}
        <Link href="/auth/resetPassword">Reset password</Link>
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
