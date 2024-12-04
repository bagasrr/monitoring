import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import { CardData } from "../molecules/SmallCard";

// Komponen CardComponent
const CardComponent = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevData, setPrevData] = useState({ temperature: null, humidity: null, pressure: null });

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [deviceId]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/data/realtime/${deviceId}`, {
        withCredentials: true,
      });
      const fetchedData = res.data.data;
      setData(fetchedData);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const animateValue = (start, end) =>
    useSpring({
      from: { number: start },
      number: end,
      delay: 0,
      config: { duration: 2000 },
    });
  const formatNumber = (number) => {
    if (number % 1 === 0) {
      return number.toFixed(0);
    }
    return number.toFixed(1);
  };
  const tempRotation = animateValue(prevData.temperature ?? 0, data?.temperature ?? 0);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      {data ? (
        <div className="bg-teal-500 w-[300px] p-5 drop-shadow-xl shadow-[0_0_10px_#08f,0_0_20px_#08f,0_0_30px_#08f,0_0_40px_#08f]">
          <h1>Room {data.deviceId}</h1>
          <CardData name="Temp" value={<animated.div>{tempRotation.number.to((n) => formatNumber(n))}</animated.div>} unit="ºC" />
          <CardData name="Hum" value={data.humidity} unit="%" />
          <CardData name="Press" value={data.pressure} unit="Pa" />
          <p className="text-xs text-white mt-5">Last Update {data.updatedAt}</p>
        </div>
      ) : (
        <div className="text-white text-3xl">No Data Available</div>
      )}
    </div>
  );
};

export default CardComponent;
