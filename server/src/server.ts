// To check the backend is working, http://localhost:5173 should show database time
// If both front end and backend is functional, curl -X GET 'http://localhost:3000/api/health'
// and curl -X GET 'http://localhost:5173/api/health' will return the database time
import "dotenv/config"; // loads .env into process.env (must come first)
import express from "express";
import { pool } from "./db";

const app = express();

// Express 5 passes errors from async handlers to its error handling.
app.get("/api/health", async (_req, res) => {
  const result = await pool.query("SELECT now() AS db_time");
  res.json({ dbTime: result.rows[0].db_time });
});

const port = 3000;//Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
