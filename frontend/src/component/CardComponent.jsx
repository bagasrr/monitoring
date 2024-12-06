import React, { useEffect, useState } from "react";
import { animated } from "@react-spring/web";
import { CardData } from "../molecules/SmallCard";
import { getRules } from "../utils/";
import { getColor, formatNumber } from "../utils/helpers";
import { getDataRealtime } from "../utils/"; // Import getDataRealtime function
import { processRules } from "../utils/processRule";
import { useValues } from "../hooks/useValues";
import { format } from "date-fns";
import useDataRealTime from "../hooks/useDataRealTime";

const CardComponent = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevData, setPrevData] = useState({ temperature: null, humidity: null, pressure: null });
  const [rules, setRules] = useState([]);
  const [currentDate, setCurretDate] = useState(new Date());

  useEffect(() => {
    getRules(setRules);
    getDataRealtime(deviceId, setData, setLoading, setError);
    const intervalId = setInterval(() => {
      getDataRealtime(deviceId, setData, setLoading, setError);
      setCurretDate(new Date());
    }, 10000);
    return () => clearInterval(intervalId);
  }, [deviceId]);

  const { tempArray, humArray, pressArray } = processRules(rules);
  const { tempValue, humValue, pressValue, tempRotation, humRotation, pressRotation } = useValues(prevData, data);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const classCard = "bg-teal-500 w-[300px] p-5 drop-shadow-xl shadow-[0_0_10px_#08f,0_0_20px_#08f,0_0_30px_#08f,0_0_40px_#08f] relative";
  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      {data ? (
        <div className={classCard}>
          <h1 className="text-white font-sans text-xs bg-rose-700 absolute -top-8 left-0 p-2 rounded-t-md">Room {data.deviceId}</h1>
          <CardData name="Temp" value={<animated.div className={getColor(tempValue, tempArray)}>{tempRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="ºC" />
          <CardData name="Hum" value={<animated.div className={getColor(humValue, humArray)}>{humRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="%" />
          <CardData name="Press" value={<animated.div className={getColor(pressValue, pressArray)}>{pressRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="Pa" />
          <animated.div className="text-xs text-white mt-5">Last Fetch : {format(currentDate, "PPpp")}</animated.div>
          <DateComponent updatedAt={data.updatedAt} caption="Last Updated :" />

          {/* <p className="text-xs text-white mt-5">Last Update {data.updatedAt}</p> */}
        </div>
      ) : (
        <div className="text-white text-3xl">No Data Available</div>
      )}
    </div>
  );
};

export default CardComponent;

export const DateComponent = ({ updatedAt, caption = "Last Updated:" }) => {
  const date = new Date(updatedAt);

  return (
    <div>
      {/* <h1>Last Updated Date: {date.toLocaleDateString()}</h1> */}
      {/* <p>Time: {date.toLocaleTimeString()}</p> */}
      {/* <p>Time: {date.toLocaleString()}</p> */}
      <p className="text-xs text-white mt-5"> {caption + " " + format(date, "PPpp")}</p>
    </div>
  );
};
