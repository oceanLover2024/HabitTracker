import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.h1}>
          The Simplest Habit Tracker App on this Planet
        </h1>
        <div className={styles.text}>
          Finally, a daily habit tracker that helps you do more, by doing less.
        </div>
        <div className={styles.btn_text_wrapper}>
          <button className={styles.start_btn}>
            ✅Start Habit Tracker today
          </button>
          <div className={styles.below_btn_text}>100% free forever</div>
        </div>
      </div>
      <div className={styles.demo}>
        <img src="/demo.gif" alt="demo" />
      </div>

      <div className={styles.part2_text}>
        It's really simple.
        <br />
        Here's how it works!
      </div>
      <div className={styles.container}>
        <div className={styles.pic_text_wrapper}>
          <div className={styles.subtitle}>
            Visualize your entire month at a glance.
          </div>
          <div className={styles.instruction}>
            With a simple calendar view, you can see your activity for the
            entire month to see how you're doing and which areas you might need
            to focus on.
          </div>
        </div>
        <Image
          src={"/table.png"}
          alt={"loading entire month"}
          width={600}
          height={200}
        />
      </div>
      <div className={`${styles.container} ${styles.container_white}`}>
        <Image
          src={"/createNew.png"}
          alt={"loading entire month"}
          width={560}
          height={300}
        />
        <div className={styles.pic_text_wrapper}>
          <div className={styles.subtitle}>
            Set flexible goals instead of streaks.
          </div>
          <div className={styles.instruction}>
            Streaks break, because life happens. But don't let that stop your
            progress. <br />
            <br />
            Goals are based on flexible consistency, which makes it okay to fail
            sometimes. It's more important that you continue doing your habit.
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.pic_text_wrapper}>
          <div className={styles.subtitle}>
            Make notes to reflect on your journey.
          </div>
          <div className={styles.instruction}>
            No journey is complete without reflection, which promotes
            self-awareness and prompts you to evaluate your own progress, as
            well as areas where you need to improve. <br />
            <br />
            Ultimately, you are the best judge of your own journey.
          </div>
        </div>
        <Image
          src={"/notes.png"}
          alt={"loading entire month"}
          width={560}
          height={300}
        />
      </div>
      <div className={`${styles.container} ${styles.container_white}`}>
        <Image
          src={"/mobile.png"}
          alt={"loading entire month"}
          width={560}
          height={300}
        />
        <div className={styles.pic_text_wrapper}>
          <div className={styles.subtitle}>Fully responsive on mobile.</div>
          <div className={styles.instruction}>
            You might be at the gym finishing off your exercise habit. Mark it
            as done right there on your mobile. Or perhaps you had an epiphany
            and you want to make a note of it.
            <br />
            <br /> Don't lose that thought. Easily access DailyHabits through
            your mobile browser.
          </div>
        </div>
      </div>
      <div className={`${styles.wrapper} ${styles.wrapper_gray}`}>
        <h1 className={styles.h1}>
          Get started for the rest of your life, today.
        </h1>
        <div className={styles.text}>
          Our mission in life is to help others achieve their full potential.
          That's why DailyHabits is a 100% free to use.
        </div>
        <div className={styles.btn_text_wrapper}>
          <button className={styles.start_btn}>
            ✅Start Habit Tracker today
          </button>
          <div className={styles.below_btn_text}>100% free forever</div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div>COPYRIGHT © 2025 Habit Tracker</div>
      </footer>
    </>
  );
}
