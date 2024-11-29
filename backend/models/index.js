import monitoringRuanganDb from "../config/index.js";
import AllTime from "./AllTimeModel.js";
import Devices from "./Devices.js";
import RealTime from "./RealTimeModel.js";

export const RealTimeModel = monitoringRuanganDb.define("realtime_data", RealTime);

export const AllTimeModel = monitoringRuanganDb.define("alltime_data", AllTime);

export const DevicesModel = monitoringRuanganDb.define("devices_data", Devices);

RealTimeModel.belongsTo(DevicesModel, { foreignKey: "deviceId" });

AllTimeModel.belongsTo(DevicesModel, { foreignKey: "deviceId" });
