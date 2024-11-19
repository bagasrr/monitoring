import monitoringRuanganDb from "../config/index.js";
import RealTime from "./RealTimeModel.js";

export const RealTimeModel = monitoringRuanganDb.define("realtime_data", RealTime);
