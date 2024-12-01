import React, { useEffect, useState } from "react";
import axios from "axios";
import { json2csv } from "json-2-csv";

const DDataFilter1 = ({ deviceId }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getData();
  }, [deviceId]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/data/alltime", {
        params: { deviceId },
        withCredentials: true,
      });
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    setFilteredData(filtered);
  };

  const downloadCSV = async () => {
    try {
      const csv = await json2csv(filteredData);
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
      <div className="mb-4">
        <label className="block text-white">Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-white">End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 rounded" />
      </div>
      <button onClick={filterData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
        Filter Data
      </button>
      <div className="mb-4">
        <h3 className="text-white">Filtered Data Preview:</h3>
        <pre className="text-white">{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
      <button onClick={downloadCSV} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download CSV
      </button>
    </div>
  );
};

export default DDataFilter1;
