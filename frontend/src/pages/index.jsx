import React from "react";
import Navbar from "../component/Navbar";
import Content from "../component/content";

const HomePage = () => {
  return (
    <div className="bg-slate-800">
      <Navbar />
      <div className="mt-10"></div>
      <Content />
    </div>
  );
};

export default HomePage;
