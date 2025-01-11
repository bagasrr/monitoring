import React, { useEffect, useState } from "react";
import axios from "axios";
import { json2csv } from "json-2-csv";

const DownloadData = ({ deviceId }) => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHidden, setIsHidden] = useState("hidden");

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
      const csv = await json2csv(filteredData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `filtered-data-${deviceId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error converting JSON to CSV:", error);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handlePreview = () => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    setFilteredData(filtered);

    if (filtered.length !== 0) {
      setIsHidden("");
    } else {
      setIsHidden("hidden");
    }

    console.log("Filtered Data Length:", filtered.length);
    console.log("isHidden:", isHidden);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <div className="flex flex-col mb-5">
        <label htmlFor="start-date" className="text-white text-md">
          Start Date
        </label>
        <input type="date" value={startDate} onChange={handleStartDateChange} className="p-2 border border-gray-300 rounded mb-2" />

        <label htmlFor="end-date" className="text-white text-md">
          End Date
        </label>
        <input type="date" value={endDate} onChange={handleEndDateChange} className="p-2 border border-gray-300 rounded mb-2" />

        <button onClick={handlePreview} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Preview
        </button>
      </div>

      <button onClick={downloadCSV} className={`${isHidden} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5`}>
        Download CSV
      </button>

      {filteredData && filteredData.length > 0 ? (
        <div className="mt-5">
          <h2 className="text-white text-lg mb-3">Preview Data: {filteredData.length} data</h2>
          <table className="w-full text-white table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Temperature</th>
                <th className="px-4 py-2 border">Humidity</th>
                <th className="px-4 py-2 border">Pressure</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="bg-gray-800">
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 border">{item.temperature}</td>
                  <td className="px-4 py-2 border">{item.humidity}</td>
                  <td className="px-4 py-2 border">{item.pressure}</td>
                  <td className="px-4 py-2 border">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-white">Tidak ada data pada rentang tanggal tersebut.</div>
      )}
    </div>
  );
};

export default DownloadData;
