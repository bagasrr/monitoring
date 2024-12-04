// routes/deviceRoutes.js
import express from "express";
import { createDevice, getAllDevices } from "../Controllers/DeviceControllers.js";

const DeviceRoute = express.Router();

DeviceRoute.post("/create", createDevice);
DeviceRoute.get("/", getAllDevices);

export default DeviceRoute;
