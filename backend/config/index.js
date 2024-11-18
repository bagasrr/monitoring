import { Sequelize } from "sequelize";

const dbName = "monitoringRuangan_db";
const dbUser = "root";
const dbPass = "";
const dbHost = "localhost";

const monitoringRuanganDb = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
});

export default monitoringRuanganDb;
