import { DataTypes } from "sequelize";

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
