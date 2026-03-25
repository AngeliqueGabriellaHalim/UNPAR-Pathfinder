//load credentials
require("dotenv").config();

// import pool from pg library
const { Pool } = require("pg");

// create the pool using credentials from .env
const pool = new Pool({
  host: process.env.DB_HOST, // e.g. "localhost"
  port: process.env.DB_PORT, // e.g. 5432
  user: process.env.DB_USER, // e.g. "postgres"
  password: process.env.DB_PASSWORD, // e.g. "mypassword"
  database: process.env.DB_NAME, // e.g. "pathfinder"
});

// listen for error
pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
  process.exit(-1); // kill process to restart
});

// export pool to make it available to other files
module.exports = pool;
