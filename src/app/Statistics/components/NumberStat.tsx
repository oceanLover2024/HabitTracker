import { BsFire } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { TfiCheckBox } from "react-icons/tfi";
type Props = { numberStat: number; category: string; logo: string };
const NumberStat = ({ numberStat, category, logo }: Props) => {
  const logoStyle = {
    color: logo === "BsFire" ? "red" : "gray",
    fontSize: "1.2rem",
    marginBottom: "0.4rem",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
      }}
    >
      {logo === "BsFire" && <BsFire style={logoStyle} />}
      {logo === "GoGoal" && <GoGoal style={logoStyle} />}
      {logo === "TfiCheckBox" && <TfiCheckBox style={logoStyle} />}
      <div style={{ fontSize: "1.1rem" }}>
        {`${numberStat} day${numberStat > 1 ? "s" : ""}`}{" "}
      </div>

      <div style={{ color: "gray", fontSize: "0.7rem" }}>{category}</div>
    </div>
  );
};
export default NumberStat;
