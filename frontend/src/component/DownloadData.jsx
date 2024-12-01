import React, { useEffect, useState } from "react";
import axios from "axios";
import { json2csv } from "json-2-csv";

const DownloadData = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, [deviceId]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/data/alltime", {
        params: { deviceId },
        withCredentials: true,
      });
      const dataObject = res.data.data;
      const dataArray = Object.values(dataObject);
      setData(dataArray);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    try {
      const csv = await json2csv(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `data-${deviceId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error converting JSON to CSV:", error);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <button onClick={downloadCSV} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download CSV
      </button>
    </div>
  );
};

export default DownloadData;
