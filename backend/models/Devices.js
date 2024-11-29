import { DataTypes } from "sequelize";
import sequelize from "../config/index.js";

const Devices = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export default Devices;
