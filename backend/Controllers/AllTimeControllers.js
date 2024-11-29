import { AllTimeModel, RealTimeModel, DevicesModel } from "../models/index.js";

export const createAllTime = async (req, res) => {
  const { deviceId, temperature, humidity, pressure } = req.body;
  if (deviceId && temperature && humidity && pressure) {
    try {
      const device = await DevicesModel.findByPk(deviceId);
      if (!device) {
        return res.json({ status: "failed", message: "Device not found" });
      }

      // Insert data to AllTime table
      await AllTimeModel.create({ deviceId, temperature, humidity, pressure });

      // Update or Insert data in Realtime table
      const [realtime, created] = await RealTimeModel.upsert({ deviceId, temperature, humidity, pressure }, { where: { deviceId } });

      res.json({ status: "success", message: "Data Added and Realtime Updated" });
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  } else {
    res.json({ status: "failed", message: "Data Input is not complete" });
  }
};

export const getAllTime = async (req, res) => {
  try {
    const data = await AllTimeModel.findAll({ include: DevicesModel });
    res.json({ data: data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
    console.log(error);
  }
};
