import React, { useEffect, useState } from "react";
import Card from "../element/Card";
import axios from "axios";
import Room from "./Room";

const Content = () => {
  return (
    <div className="m-auto flex gap-10 p-20 flex-wrap justify-evenly">
      <Room deviceId={1} />
    </div>
  );
};

export default Content;
