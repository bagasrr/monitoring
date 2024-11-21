import { DataTypes, Sequelize } from "sequelize";

const AllTime = {
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pressure: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
};

export default AllTime;
