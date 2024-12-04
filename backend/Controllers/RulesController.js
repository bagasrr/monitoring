import { RulesModel } from "../models";

export const createRules = async (req, res) => {
  try {
    const data = await RulesModel.create(req.body);
    res.json({ data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getAllRules = async (req, res) => {
  try {
    const data = await RulesModel.findAll();
    res.json({ data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getRulesByName = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await RulesModel.findOne({ where: { name } });
    res.json({ data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const updateRules = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await RulesModel.update(req.body, { where: { id } });
    res.json({ data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};
