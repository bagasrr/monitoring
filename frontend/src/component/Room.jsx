import React, { useEffect, useState } from "react";
import Card from "../element/Card";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";

const Room = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevData, setPrevData] = useState({ temperature: null, humidity: null, pressure: null });

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 10000); // 10 seconds
    return () => clearInterval(intervalId);
  }, [deviceId]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/data/realtime`, {
        params: { deviceId },
        withCredentials: true,
      });
      setPrevData(data ?? { temperature: null, humidity: null, pressure: null });
      setData(res.data.data); // Directly set the object
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
      config: { duration: 2000 }, // Durasi transisi
    });

  const temperatureSpring = animateValue(prevData.temperature ?? 0, data?.temperature ?? 0);
  const humiditySpring = animateValue(prevData.humidity ?? 0, data?.humidity ?? 0);
  const pressureSpring = animateValue(prevData.pressure ?? 0, data?.pressure ?? 0);

  const formatNumber = (number) => {
    if (number % 1 === 0) {
      return number.toFixed(0); // Tidak menampilkan angka di belakang koma jika tidak ada
    }
    return number.toFixed(1); // Menampilkan satu angka di belakang koma jika ada
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      {data ? (
        <Card
          key={data.deviceId}
          cardTitle={`Room ${data.deviceId}`}
          Temp={<animated.div>{temperatureSpring.number.to((n) => formatNumber(n))}</animated.div>}
          Hum={<animated.div>{humiditySpring.number.to((n) => formatNumber(n))}</animated.div>}
          Press={<animated.div>{pressureSpring.number.to((n) => formatNumber(n))}</animated.div>}
        />
      ) : (
        <div className="text-white text-3xl">No Data Available</div>
      )}
    </div>
  );
};

export default Room;
