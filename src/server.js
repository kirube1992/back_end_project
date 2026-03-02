import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import { config } from "dotenv";
import { connetDB, disconnectDB } from "./config/db.js";

config();
connetDB();
const app = express();

app.use("/movies", movieRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);

  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

/**
 * Handle uncaught exceptions
 */
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

/**
 * Handle SIGTERM (e.g., from Docker, production shutdown)
 */
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  await disconnectDB();
  server.close(() => {
    process.exit(0);
  });
});
