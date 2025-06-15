import { monthRate } from "@/app/dashboard/components/type/habitType";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
const MonthlyLineChart = ({ data }: { data: monthRate[] }) => {
  return (
    <div>
      <LineChart data={data} width={350} height={150}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="percent" stroke="#00CC66" />
      </LineChart>
      <div style={{ textAlign: "end", color: "gray", fontSize: "0.7rem" }}>
        Monthly Goal Completion Rate
      </div>
    </div>
  );
};
export default MonthlyLineChart;
