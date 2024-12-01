import React from "react";
import { CardData } from "../molecules/SmallCard";

const Card = ({ cardTitle = "Room 1", Temp, Hum, Press, lastUpdated }) => {
  const TempRule = [20.0, 20.5, 29.5, 30.0];
  const HumRule = [40, 45, 55, 60];
  const PressRule = [1000, 1005, 1015, 1020];

  const getColor = (value, rules) => {
    const [min, warnMin, warnMax, max] = rules;
    if (value < min || value > max) {
      return "text-red-500";
    } else if (value <= warnMin || value >= warnMax) {
      return "text-yellow-500";
    } else {
      return "text-white";
    }
  };

  return (
    <div className="bg-teal-500 w-[300px] p-5 drop-shadow-xl shadow-[0_0_10px_#08f,0_0_20px_#08f,0_0_30px_#08f,0_0_40px_#08f]">
      <div className="cardTitle py-5">
        <h1 className="text-white font-sans text-xl">{cardTitle}</h1>
      </div>
      <div>
        <CardData name="Temp" value={Temp} unit="°C" className={getColor(Temp, TempRule)} />
        <CardData name="Hum" value={Hum} unit="%" className={getColor(Hum, HumRule)} />
        <CardData name="Press" value={Press} unit="Pa" className={getColor(Press, PressRule)} />
      </div>
      <div className="mt-5 text-white text-xs">{lastUpdated}</div>
    </div>
  );
};

export default Card;
