import express from "express";

import AllTimeRoute from "./AllTimeRoute.js";
import RealTimeRoute from "./RealTimeRoute.js";
import DeviceRoute from "./DevicesRoute.js";

const routes = express.Router();

routes.use("/data", AllTimeRoute);
routes.use("/data", RealTimeRoute);
routes.use("/devices", DeviceRoute);
routes.use("/rules", DeviceRoute);

export default routes;
