import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const DDataFormat = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (deviceId) {
      getData();
    }
  }, [deviceId]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/data/alltime`, {
        params: { deviceId },
        withCredentials: true,
      });
      const dataObject = res.data.data;
      const dataArray = Object.values(dataObject);
      //   console.log("dataObejct", dataObject);
      //   console.log("dataArray", dataArray);

      const updatedData = dataArray.map((item) => {
        if (!item.updatedAt) {
          throw new Error("updatedAt is undefined");
        }
        const zonedTime = toZonedTime(parseISO(item.updatedAt), "Asia/Jakarta");
        return {
          ...item,
          updatedAt: format(zonedTime, "yyyy-MM-dd HH:mm:ssXXX", { timeZone: "Asia/Jakarta" }),
        };
      });
      setData(updatedData);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const convertToCSV = (objArray) => {
    const array = [Object.keys(objArray[0])].concat(objArray);
    return array
      .map((row) => {
        return Object.values(row).toString();
      })
      .join("\n");
  };

  const downloadCSV = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `data-${deviceId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <button onClick={downloadCSV} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download CSV formated
      </button>
    </div>
  );
};

export default DDataFormat;
