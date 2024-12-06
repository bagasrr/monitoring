import { useState, useEffect } from "react";
import axios from "axios";

const useDeviceIds = () => {
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

  return { deviceIds, loading, error };
};

export default useDeviceIds;
