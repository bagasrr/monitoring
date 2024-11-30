import React, { useEffect, useState } from "react";
import Card from "../element/Card";
import axios from "axios";

const Room = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 10000); // 10 seconds // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [deviceId]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/data/realtime`, {
        params: { deviceId },
        withCredentials: true,
      });
      console.log("Data received:", res.data.data); // Log data to ensure it's correctly received
      setData(res.data.data); // Directly set the object
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      {data ? <Card key={data.deviceId} cardTitle={`Room ${data.deviceId}`} Temp={data.temperature} Hum={data.humidity} Press={data.pressure} /> : <div className="text-white text-3xl">No Data Available</div>}
    </div>
  );
};

export default Room;
