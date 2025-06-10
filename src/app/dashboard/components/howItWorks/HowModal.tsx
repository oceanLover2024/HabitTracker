import { JSX } from "react";
import styles from "../CreateModal.module.css";
type HowModalProps = {
  onClose: () => void;
  contentKey: string;
};
const HowModal = ({ onClose, contentKey }: HowModalProps) => {
  const titleAll: Record<string, string> = {
    how: "How to use DailyHabits",
    goals: "Why set goals",
    notes: "When to make notes",
    archive: "When to archive a goal",
  };
  const contentAll: Record<string, JSX.Element> = {
    how: (
      <div className={styles.how_wrapper}>
        <h4>DailyHabits works on three principles:</h4>
        <p>
          1) Habits should be formed for life, until they become like brushing
          teeth.
        </p>
        <p>
          2) Goals should be flexible. You don&apos;t need to try and maintain
          streaks. Just set a realistic and achievable goal and try to achieve
          it.
        </p>
        <p>
          3) Make notes as your journey progresses. The purpose is to
          self-reflect on your success/failure as you try to get better.
        </p>
        <h4>Get started:</h4>
        <p>
          1) Set your habits by clicking on <strong>+ New Habit.</strong>
        </p>
        <p>
          2) Set <strong>goals</strong> for each habit.
        </p>
        <p>
          3) <strong>Click</strong> on any empty block in the calendar to mark a
          habit as done. Click again to toggle.
        </p>
      </div>
    ),
    goals: (
      <div className={styles.how_wrapper}>
        <p>Goals are based on the concept of flexible consistency.</p>{" "}
        <p>
          While other habit trackers force you to maintain streaks, which add
          pressure to your life instead of taking it away, goals are based on
          the idea that “life keeps happening” and you may miss a day or two.
          But even if you do miss a day, you should just keep going.
        </p>{" "}
        <p>
          To do that, you set a goal, i.e. how many times a month do you want to
          perform an activity. For eg., “exercise 15 times a month”.
        </p>
        <p>
          Now you can perform the activity every alternate day or just on
          certain days of the week. The purpose is to do it 15 times a month.
        </p>
      </div>
    ),
    notes: (
      <div className={styles.how_wrapper}>
        <p>
          Self-reflection is the best way to improve. You know where you’re
          doing well, and where you need to get better.
        </p>
        <p>
          Notes is an easy way to record your progress. It could be positive
          thoughts like “I have been exercising regularly this month and it
          feels great.”
        </p>
        <p>
          It could even be constructive thoughts like “I’m sleeping late, and
          not being able to wake up on time. I need to fix my sleeping habit.”
        </p>
        <p>
          Write notes to keep a track of your progress and as a way to set
          checkpoints in your journey.
        </p>
      </div>
    ),
    archive: (
      <div className={styles.how_wrapper}>
        <p>
          Goals change over time. You may have achieved what you wanted from a
          particular goal and you no longer want to track it in DailyHabits.
        </p>
        <p>
          In such cases, simply archive the goal. Once you archive a goal, you
          no longer have to mark it as done on a daily basis. The habit will
          continue showing in your calendar for the month, but it will not show
          up from the next month onwards.
        </p>
        <p>
          In such cases, simply archive the goal. Once you archive a goal, you
          no longer have to mark it as done on a daily basis. The habit will
          continue showing in your calendar for the month, but it will not show
          up from the next month onwards.
        </p>
      </div>
    ),
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title_btn}>
          <div className={styles.title_text}>{titleAll[contentKey]}</div>
          <button className={styles.x} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.form_wrapper}>
          <div>{contentAll[contentKey]}</div>
        </div>
      </div>
    </div>
  );
};
export default HowModal;
