// fetch images for a given edge to display in frontend

const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

// GET /api/images/edge/:edgeId
// returns all images for a specific edge, ordered by step_order
//notes: called by the RoutePage page for each edge step in the route

router.get("/edge/:edgeId", async (req, res) => {
  const { edgeId } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, edge_id, image_url, step_order, petunjuk
       FROM edge_images
       WHERE edge_id = $1
       ORDER BY step_order ASC`,
      [edgeId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
