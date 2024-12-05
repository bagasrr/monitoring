import React, { useEffect, useState } from "react";
import { animated } from "@react-spring/web";
import { CardData } from "../molecules/SmallCard";
import { getRules } from "../utils/";
import useAnimateValue from "../hooks/useAnimateValue";
import { getColor, formatNumber } from "../utils/helpers";
import { getDataRealtime } from "../utils/"; // Import getDataRealtime function
import { processRules } from "../utils/processRule";
import { useValues } from "../hooks/useValues";

const CardComponent = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevData, setPrevData] = useState({ temperature: null, humidity: null, pressure: null });
  const [rules, setRules] = useState([]);

  useEffect(() => {
    getRules(setRules);
    getDataRealtime(deviceId, setData, setLoading, setError);
    const intervalId = setInterval(() => {
      getDataRealtime(deviceId, setData, setLoading, setError);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [deviceId]);

  const { tempArray, humArray, pressArray } = processRules(rules);
  const { tempValue, humValue, pressValue, tempRotation, humRotation, pressRotation } = useValues(prevData, data);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      {data ? (
        <div className="bg-teal-500 w-[300px] p-5 drop-shadow-xl shadow-[0_0_10px_#08f,0_0_20px_#08f,0_0_30px_#08f,0_0_40px_#08f]">
          <h1>Room {data.deviceId}</h1>
          <CardData name="Temp" value={<animated.div className={getColor(tempValue, tempArray)}>{tempRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="ºC" />
          <CardData name="Hum" value={<animated.div className={getColor(humValue, humArray)}>{humRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="%" />
          <CardData name="Press" value={<animated.div className={getColor(pressValue, pressArray)}>{pressRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="Pa" />
          <p className="text-xs text-white mt-5">Last Update {data.updatedAt}</p>
        </div>
      ) : (
        <div className="text-white text-3xl">No Data Available</div>
      )}
    </div>
  );
};

export default CardComponent;
