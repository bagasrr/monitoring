import express from "express";
import { createRules, getAllRules, getRulesByName, updateRules } from "../Controllers/RulesController";

const RulesRoute = express.Router();

RulesRoute.get("/", getAllRules);
RulesRoute.get("/:name", getRulesByName);
RulesRoute.patch("/:id", updateRules);
RulesRoute.post("/", createRules);

export default RulesRoute;
