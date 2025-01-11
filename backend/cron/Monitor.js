import cron from "node-cron";
import { RealTimeModel } from "../models/index.js";
import { RulesModel } from "../models/index.js";
import { DevicesModel } from "../models/index.js"; // Import DevicesModel
import sendEmail from "../services/emailService.js";

cron.schedule("* * * * *", async () => {
  console.log("Cron job started");
  // Run every minute
  try {
    const devices = await DevicesModel.findAll(); // Fetch all devices

    for (const device of devices) {
      const latestData = await RealTimeModel.findOne({
        where: { deviceId: device.id }, // Fetch data for specific device
        order: [["createdAt", "DESC"]],
      });

      const rules = await RulesModel.findAll();

      rules.forEach((rule) => {
        if (rule.name === "temperature" && (latestData.temperature < rule.minAlert || latestData.temperature > rule.maxAlert)) {
          sendEmail("kuliah.bagass@gmail.com", "Temperature Alert", `Device ID: ${device.id}, Temperature: ${latestData.temperature}°C is out of bounds!`);
        }
        if (rule.name === "humidity" && (latestData.humidity < rule.minAlert || latestData.humidity > rule.maxAlert)) {
          sendEmail("kuliah.bagass@gmail.com", "Humidity Alert", `Device ID: ${device.id}, Humidity: ${latestData.humidity}% is out of bounds!`);
        }
        if (rule.name === "pressure" && (latestData.pressure < rule.minAlert || latestData.pressure > rule.maxAlert)) {
          sendEmail("kuliah.bagass@gmail.com", "Pressure Alert", `Device ID: ${device.id}, Pressure: ${latestData.pressure} hPa is out of bounds!`);
        }
      });
    }
  } catch (error) {
    console.error("Error checking conditions:", error);
  }
});
