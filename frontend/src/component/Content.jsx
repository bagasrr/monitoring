import React from "react";
import Card from "../element/Card";

const Content = () => {
  const data = [
    {
      id: 1,
      temp: 22.5,
      humidity: 55,
      pressure: 12,
    },
    {
      id: 2,
      temp: 24.1,
      humidity: 60,
      pressure: 1005,
    },
    {
      id: 3,
      temp: 19.8,
      humidity: 65,
      pressure: 1008,
    },
    {
      id: 4,
      temp: 21.3,
      humidity: 58,
      pressure: 1015,
    },
    {
      id: 5,
      temp: 23.7,
      humidity: 62,
      pressure: 1009,
    },
    {
      id: 6,
      temp: 20.4,
      humidity: 57,
      pressure: 1013,
    },
    {
      id: 7,
      temp: 25.0,
      humidity: 59,
      pressure: 1007,
    },
    {
      id: 8,
      temp: 18.9,
      humidity: 63,
      pressure: 1014,
    },
    {
      id: 9,
      temp: 22.0,
      humidity: 61,
      pressure: 1010,
    },
    {
      id: 10,
      temp: 24.5,
      humidity: 56,
      pressure: 1006,
    },
  ];

  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      {data.map((item) => {
        return <Card key={item.id} cardTitle={`Room ${item.id}`} Temp={item.temp} Hum={item.humidity} Press={item.pressure} />;
      })}
    </div>
  );
};

export default Content;
