// load credentials
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const routeRouter = require("./routes/route");
const path = require("path");

// creates a new web server application
const app = express();
const PORT = process.env.PORT || 3001;

// Read allowed CORS origins from the environment variable
app.set("trust proxy", 1);

// Allow cross-origin requests only from approved origins
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : false }));

// parse incoming body as json
app.use(express.json());

// when a browser requests GET /uploads/someimage.jpg, express looks in the "uploads" folder and returns the file
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// RATE LIMITING: mencegah penyalahgunaan / DDoS
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // jendela 1 menit for counting requests
  max: 120, // maks 120 permintaan/menit/IP within the time window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Terlalu banyak permintaan, coba lagi sebentar lagi." },
});
// Apply rate limiting to all API endpoints
app.use("/api", apiLimiter);

// Register all API routes
app.use("/api", routeRouter);

// client error handling
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Images served at http://localhost:${PORT}/uploads/`);
});
