import express from "express";
import { createRealTime, getRealTime } from "../Controllers/RealTimeControllers.js";

const RealTimeRoute = express.Router();

RealTimeRoute.get("/realtime", getRealTime);
RealTimeRoute.post("/realtime", createRealTime);

export default RealTimeRoute;
