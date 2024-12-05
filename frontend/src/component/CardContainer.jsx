import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";
const CardContainer = () => {
  const [deviceIds, setDeviceIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceIds = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/devices`);
        const deviceIds = res.data.data.map((device) => device.id);
        setDeviceIds(deviceIds);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceIds();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap gap-10 justify-evenly">
      {deviceIds.map((id) => (
        <div key={id}>
          <CardComponent deviceId={id} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
