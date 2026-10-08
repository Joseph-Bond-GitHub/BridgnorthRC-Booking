import "dotenv/config"; // loads .env into process.env (must come first)
import express from "express";
import { pool } from "./db";

const app = express();

// Express 5 passes errors from async handlers to its error handling.
app.get("/api/health", async (_req, res) => {
  const result = await pool.query("SELECT now() AS db_time");
  res.json({ dbTime: result.rows[0].db_time });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));