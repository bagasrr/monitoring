import { RealTimeModel, DevicesModel } from "../models/index.js";

export const getRealTime = async (req, res) => {
  try {
    const data = await RealTimeModel.findAll({ include: { model: DevicesModel, as: "device" } });
    res.json({ data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
    console.log(error);
  }
};

export const getRealTimeByDeviceId = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const data = await RealTimeModel.findOne({
      where: { deviceId },
      include: {
        model: DevicesModel,
        as: "device", // Menggunakan alias yang didefinisikan dalam relasi
      },
    });
    res.json({ data: data });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
    console.log(error);
  }
};
