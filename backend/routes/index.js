import express from "express";

import AllTimeRoute from "./AllTimeRoute.js";
import RealTimeRoute from "./RealTimeRoute.js";
import DeviceRoute from "./DevicesRoute.js";
import RulesRoute from "./RulesRoute.js";
import MonitorRoute from "./MonitorRoute.js";

const routes = express.Router();

routes.use("/data", AllTimeRoute);
routes.use("/data", RealTimeRoute);
routes.use("/devices", DeviceRoute);
routes.use("/rules", RulesRoute);
routes.use("/monitor", MonitorRoute);

export default routes;
