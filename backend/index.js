import express from "express";
import monitoringRuanganDb from "./config/index.js";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  await monitoringRuanganDb.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

monitoringRuanganDb.sync().catch((error) => {
  console.error("Error creating database & tables:", error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
