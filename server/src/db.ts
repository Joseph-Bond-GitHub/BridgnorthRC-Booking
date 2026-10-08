import { Pool } from "pg";

// "A pool keeps several database connections open and lends them out per query,
// which is much faster than reconnecting every time".
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });