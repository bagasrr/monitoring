import { DataTypes } from "sequelize";

const Rules = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minAlert: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  maxAlert: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  maxLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
};

export default Rules;
