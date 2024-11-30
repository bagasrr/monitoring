import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import monitoringRuanganDb from "./config/index.js";
import routes from "./routes/index.js";

const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173", "http://192.168.1.1"], // Tambahkan IP lokal Anda
//   })
// ); // Tambahkan middleware untuk mengizinkan header tambahan
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin); // Mengizinkan asal yang sesuai res.header
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-xsrf-token");
//   res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   next();
// });

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

// app.listen(port, () => {
//   console.log("Server running on port 4000");
// });
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});

monitoringRuanganDb.sync().catch((error) => {
  console.error("Error creating database & tables:", error);
});
