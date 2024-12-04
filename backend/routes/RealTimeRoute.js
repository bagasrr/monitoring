import express from "express";
import { getRealTime, getRealTimeByDeviceId } from "../Controllers/RealTimeControllers.js";

const RealTimeRoute = express.Router();

RealTimeRoute.get("/realtime/:deviceId", getRealTimeByDeviceId);
// cara testing http://localhost:4000/api/data/realtime?deviceId=1
// RealTimeRoute.post("/realtime", createRealTime);

export default RealTimeRoute;
