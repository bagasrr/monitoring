import express from "express";
import { createAllTime, getAllTime } from "../Controllers/AllTimeControllers.js";

const AllTimeRoute = express.Router();

AllTimeRoute.get("/alltime", getAllTime);
AllTimeRoute.post("/alltime", createAllTime);

export default AllTimeRoute;