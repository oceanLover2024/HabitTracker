"use client";
import styles from "../sign.module.css";
import { auth } from "@/app/lib/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        alert("Register failed:" + e.message);
      } else {
        alert("Register failed");
      }
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Create your Habit Tracker account</h2>
        <div className={styles.form}>
          <div className={styles.input_wrapper}>
            <div className={styles.label_star}>
              <FaStarOfLife className={styles.star} />
              Email Address
            </div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.input_wrapper}>
            <div className={styles.label_star}>
              <FaStarOfLife className={styles.star} />
              Password
            </div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <button onClick={handleSignIn} className={styles.btn}>
            Create account
          </button>
        </div>
        <div className={styles.forgot_link}>
          Forgot your password? <a>Reset password</a>
        </div>
      </div>
    </>
  );
};
export default Register;
