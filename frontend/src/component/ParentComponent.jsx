import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";

const ParentComponent = () => {
  const [deviceIds, setDeviceIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceIds = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/devices`);
        console.log(res.data.data);
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
        <CardComponent key={id} deviceId={id} />
      ))}
    </div>
  );
};

export default ParentComponent;
