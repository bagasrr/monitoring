import express from "express";
import cors from "cors";
import monitoringRuanganDb from "./config/index.js";
import RealTimeRoute from "./routes/RealTimeRoute.js";

const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use(RealTimeRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  await monitoringRuanganDb.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log("Server running on port 4000");
});

monitoringRuanganDb.sync().catch((error) => {
  console.error("Error creating database & tables:", error);
});
