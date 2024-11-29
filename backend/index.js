import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import monitoringRuanganDb from "./config/index.js";
import routes from "./routes/index.js";

const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
// app.use("/api", RealTimeRoute);
// app.use("/api", AllTimeRoute);

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
