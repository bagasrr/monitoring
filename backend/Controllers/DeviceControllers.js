// controllers/DeviceController.js
import { DevicesModel } from "../models/index.js";

export const createDevice = async (req, res) => {
  const { name, description } = req.body;
  try {
    const device = await DevicesModel.create({ name, description });
    res.json({ status: "success", message: "Device Created", device });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const devices = await DevicesModel.findAll();
    res.json({ data: devices });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};
