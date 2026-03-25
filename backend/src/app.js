//load credentials
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routeRouter = require("./routes/route"); //import route

// creates a new web server application
const app = express();
const PORT = process.env.PORT || 3001;

//corse allow us
app.use(cors());

// parse incoming body as json
app.use(express.json());

app.use("/api", routeRouter);

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
});
