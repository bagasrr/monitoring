import monitoringRuanganDb from "../config/index.js";
import AllTime from "./AllTimeModel.js";
import Devices from "./Devices.js";
import RealTime from "./RealTimeModel.js";
import Rules from "./Rules.js";

export const RealTimeModel = monitoringRuanganDb.define("realtime_data", RealTime);

export const AllTimeModel = monitoringRuanganDb.define("alltime_data", AllTime);

export const DevicesModel = monitoringRuanganDb.define("devices_data", Devices);

export const RulesModel = monitoringRuanganDb.define("rules_data", Rules);

// Definisikan relasi dengan alias
RealTimeModel.belongsTo(DevicesModel, { as: "device", foreignKey: "deviceId" });
AllTimeModel.belongsTo(DevicesModel, { as: "device", foreignKey: "deviceId" });
DevicesModel.hasMany(RealTimeModel, { as: "realTimeData", foreignKey: "deviceId" });
DevicesModel.hasMany(AllTimeModel, { as: "allTimeData", foreignKey: "deviceId" });
