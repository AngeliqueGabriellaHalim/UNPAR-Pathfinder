//load credentials
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routeRouter = require("./routes/route"); //import route
const path = require("path"); // built-in Node.js module for file paths
const imageRouter = require("./routes/image");

// creates a new web server application
const app = express();
const PORT = process.env.PORT || 3001;

//corse allow us
app.use(cors());

// parse incoming body as json
app.use(express.json());

// When a browser requests GET /uploads/someimage.jpg,
// Express looks in the "uploads" folder and returns the file.
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api", routeRouter);

// image routes
// e.g. POST /api/images/edge/:edgeId
app.use("/api/images", imageRouter);

//client error handling
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
