import { AllTimeModel } from "../models/index.js";

export const getAllTime = async (req, res) => {
  try {
    const data = await AllTimeModel.findAll();
    res.json({ data: data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
    console.log(error);
  }
};

export const createAllTime = async (req, res) => {
  try {
    const { temperature, humidity, pressure } = req.body;

    if (temperature && humidity && pressure) {
      try {
        const data = await AllTimeModel.create({
          temperature,
          humidity,
          pressure,
        });
        res.json(data);
      } catch (error) {
        res.json({ status: "failed", message: error.message });
      }
    } else {
      res.status(400).json({ error: "All fields are required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
