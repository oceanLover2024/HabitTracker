"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Nav.module.css";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
import HowModal from "../../dashboard/components/howItWorks/HowModal";
import DeleteAccount from "./DeleteAccount";
const Nav = () => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [showHow, setshowHow] = useState<boolean>(false);
  const [contentKey, setContentKey] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const handleLogout = async () => await signOut(auth);
  const handleHowModal = (contentKey: string) => {
    setContentKey(contentKey);
    setshowHow(true);
  };

  return (
    <div className={styles.outer}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href={user ? "/dashboard" : "/"} className={styles.logo}>
            {pathname === "/" ? "✅Habit Tracker" : "Habit Tracker"}
          </Link>
          {pathname === "/dashboard" && user ? (
            <div className={styles.dropdown_wrapper}>
              <div className={styles.dropdown_title}>
                How <span className={styles.mobile_short_text}>it works</span>
                <RiArrowDropDownLine className={styles.icon} />
              </div>
              <div className={styles.dropdown_box}>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleHowModal("how")}
                >
                  How to use DailyHabits
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleHowModal("goals")}
                >
                  Why set goals
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleHowModal("notes")}
                >
                  When to make notes
                </div>
                <div
                  className={styles.dropdown_item}
                  onClick={() => handleHowModal("archive")}
                >
                  When to archive a goal
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={styles.right}>
          {["/auth/login", "/auth/register", "/auth/resetPassword"].includes(
            pathname
          ) &&
          !isLoading &&
          !user ? (
            <>
              <Link href="/auth/login" className={styles.link_to_login}>
                <span> Login</span>
              </Link>

              <Link href="/auth/register">
                <button className={styles.create_account_btn}>
                  <span>
                    Create
                    <span className={styles.mobile_short_text}>account</span>
                  </span>
                </button>
              </Link>
            </>
          ) : (
            ""
          )}
          {user && (
            <div className={styles.stat_email_wrapper}>
              <Link href="/Statistics" className={styles.statistics_link}>
                Statistics
              </Link>
              <div className={styles.dropdown_wrapper}>
                <div className={styles.dropdown_title}>
                  <span className={styles.desktop_menu}>{user.email}</span>
                  <RiArrowDropDownLine
                    className={`${styles.icon} ${styles.desktop_menu}`}
                  />
                  <CiMenuBurger className={styles.mobile_menu} />
                </div>
                <div
                  className={`${styles.dropdown_box} ${styles.mobile_dropdown_box}`}
                >
                  <div
                    className={styles.dropdown_item}
                    onClick={() => {
                      setOpenDeleteModal(true);
                    }}
                  >
                    Delete your account
                  </div>

                  <div onClick={handleLogout} className={styles.logout}>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          )}
          <DeleteAccount
            onOpen={openDeleteModal}
            onClose={() => {
              setOpenDeleteModal(false);
            }}
            password={password}
            setPassword={setPassword}
          />
          {pathname === "/" && !user && !isLoading ? (
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
          ) : (
            ""
          )}
        </div>
        {showHow && (
          <HowModal onClose={() => setshowHow(false)} contentKey={contentKey} />
        )}
      </nav>
    </div>
  );
};
export default Nav;
