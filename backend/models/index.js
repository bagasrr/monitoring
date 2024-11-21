import monitoringRuanganDb from "../config/index.js";
import AllTime from "./AllTimeModel.js";
import RealTime from "./RealTimeModel.js";

export const RealTimeModel = monitoringRuanganDb.define("realtime_data", RealTime);

export const AllTimeModel = monitoringRuanganDb.define("alltime_data", AllTime);
