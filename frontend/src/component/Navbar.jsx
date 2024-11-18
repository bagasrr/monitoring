import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-center items-center">
        <div className="text-white text-3xl font-bold">Room Control Monitoring</div>
      </div>
    </nav>
  );
};

export default Navbar;
