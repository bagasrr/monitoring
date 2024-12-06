import React, { useEffect, useState } from "react";
import { getDataRealtime } from "../utils";

const useDataRealTime = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDataRealtime(deviceId, setData, setLoading, setError);
  }, [deviceId]);
};

export default useDataRealTime;
