import styles from "./Circle.module.css";
type Props = {
  percent: number;
  width?: number;
  strokeWidth?: number;
  title: string;
};
const GoalCircle = ({
  percent,
  width = 100,
  strokeWidth = 15,
  title,
}: Props) => {
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  return (
    <div className={styles.wrapper} style={{ width: width, height: width }}>
      <svg style={{ width: width, height: width }}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAFF55" />
            <stop offset="100%" stopColor="#72F283" />
          </linearGradient>
        </defs>
        <circle
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
          cx={width / 2}
          cy={width / 2}
          r={radius}
        />
        <circle
          className={styles.progress_circle}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.text}>
        <div className={styles.percent}>{Math.round(percent)}%</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default GoalCircle;
