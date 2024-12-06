import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import useDeviceIds from "../hooks/useDeviceIds";
const CardContainer = () => {
  const { deviceIds, loading, error } = useDeviceIds();

  if (loading) return <div className="text-white text-center text-md">Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-md">Error: {error.message}</div>;

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
