//load credentials
require("dotenv").config();

// import pool from pg library
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// listen for error
pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
  process.exit(-1); // kill process to restart
});

// export pool to make it available to other files
module.exports = pool;
