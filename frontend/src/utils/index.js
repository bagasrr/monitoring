import axios from "axios";

export const getRules = async (setRules) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/rules`);
    return setRules(res.data.rules);
    // console.log(res.data.rules);
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataRealtime = async (deviceId, setData, setLoading, setError) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/data/realtime/${deviceId}`, { withCredentials: true });
    const fetchedData = res.data.data;
    setData(fetchedData);
  } catch (error) {
    setError(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const fetchDeviceIds = async ({ setDeviceIds, setLoading, setError }) => {
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
