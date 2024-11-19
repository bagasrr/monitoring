import { RealTimeModel } from "../models/index.js";

export const getRealTime = async (req, res) => {
  try {
    const data = await RealTimeModel.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const createRealTime = async (req, res) => {
  try {
    const { temperature, humidity, pressure } = req.body;

    // Validasi data sebelum membuat entri baru
    // if (temperature == null || humidity == null || pressure == null) {
    //   return res.status(400).json({ error: "All fields are required" });
    // }
    if (temperature == null) return res.status(400).json({ error: "Temperature is required" });
    if (humidity == null) return res.status(400).json({ error: "Humidity is required" });
    if (pressure == null) return res.status(400).json({ error: "Pressure is required" });

    const data = await RealTimeModel.create({
      temperature: temperature,
      humidity: humidity,
      pressure: pressure,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
