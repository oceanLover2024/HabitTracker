"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Nav.module.css";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
import HowModal from "../dashboard/components/howItWorks/HowModal";
const Nav = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [showHow, setshowHow] = useState<boolean>(false);
  const [contentKey, setContentKey] = useState<string>("");
  const handleLogout = async () => await signOut(auth);
  const handleHowModal = (contentKey: string) => {
    setContentKey(contentKey);
    setshowHow(true);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href={user ? "/dashboard" : "/"} className={styles.logo}>
          {pathname === "/" ? "✅Habit Tracker" : "Habit Tracker"}
        </Link>
        {pathname === "/dashboard" && user ? (
          <div className={styles.dropdown_wrapper}>
            <button className={styles.dropdown_title}>
              How it works
              <RiArrowDropDownLine className={styles.icon} />
            </button>
            <div className={styles.dropdown_box}>
              <button
                className={styles.dropdown_item}
                onClick={() => handleHowModal("how")}
              >
                How to use DailyHabits
              </button>
              <button
                className={styles.dropdown_item}
                onClick={() => handleHowModal("goals")}
              >
                Why set goals
              </button>
              <button
                className={styles.dropdown_item}
                onClick={() => handleHowModal("notes")}
              >
                When to make notes
              </button>
              <button
                className={styles.dropdown_item}
                onClick={() => handleHowModal("archive")}
              >
                When to archive a goal
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.right}>
        {["/auth/login", "/auth/register"].includes(pathname) && (
          <>
            <Link href="/auth/login" className={styles.link_to_login}>
              <span> Login</span>
            </Link>

            <Link href="/auth/register">
              <button className={styles.create_account_btn}>
                <span> Create account</span>
              </button>
            </Link>
          </>
        )}
        {user && (
          <div className={styles.dropdown_wrapper}>
            <button className={styles.dropdown_title}>
              <span className={styles.desktop_menu}>{user.email}</span>
              <RiArrowDropDownLine
                className={`${styles.icon} ${styles.desktop_menu}`}
              />
              <CiMenuBurger className={styles.mobile_menu} />
            </button>
            <div
              className={`${styles.dropdown_box} ${styles.mobile_dropdown_box}`}
            >
              <Link href="/Statistics">
                <div className={styles.dropdown_item}>Statistics</div>
              </Link>

              <button className={styles.dropdown_item}>
                Delete your account
              </button>
              <button onClick={handleLogout} className={styles.logout}>
                Logout
              </button>
            </div>
          </div>
        )}
        {pathname === "/" && (
          <>
            <Link href="/auth/login" className={styles.link_to_login}>
              <span> Login</span>
            </Link>

            <Link href="/auth/register">
              <button className={styles.start_today}>
                <span> Start Today</span>
              </button>
            </Link>
          </>
        )}
      </div>
      {showHow && (
        <HowModal onClose={() => setshowHow(false)} contentKey={contentKey} />
      )}
    </nav>
  );
};
export default Nav;
