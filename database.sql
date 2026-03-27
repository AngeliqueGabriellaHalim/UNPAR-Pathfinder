-- TABLE: node

CREATE TABLE node (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,

  -- LANTAI=0, lift = 2, tangga=1
  tipe SMALLINT NOT NULL,

  -- coordinates for A*
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,

  -- can be selected as destination
  is_destination BOOLEAN NOT NULL DEFAULT FALSE
);


-- TABLE: edge

CREATE TABLE edge (
  id SERIAL PRIMARY KEY,

  from_id INT NOT NULL REFERENCES node(id) ON DELETE CASCADE,
  to_id   INT NOT NULL REFERENCES node(id) ON DELETE CASCADE,

  -- accessibility:
  -- 0 = tidak accessible
  -- 1 = bisa mandiri
  -- 2 = butuh bantuan
  accessible SMALLINT NOT NULL DEFAULT 0 CHECK (accessible IN (0, 1, 2)),
  weight FLOAT NOT NULL DEFAULT 1.0
);


-- Stores photos that visually guide a user along a specific edge.
-- One edge can have MULTIPLE images (e.g. "look left", "enter door").

CREATE TABLE edge_images (
  id SERIAL PRIMARY KEY,

  -- ON DELETE CASCADE so if the edge is deleted, all its images are too
  edge_id INT NOT NULL REFERENCES edge(id) ON DELETE CASCADE,

  -- The file path on the server, e.g. "/uploads/1714000000000-photo.jpg"
  -- The actual file lives in backend/uploads/ folder
  image_url   TEXT NOT NULL,

  petunjuk TEXT,

  -- step_order=1 shows first, step_order=2 shows second, etc.
  step_order  INT NOT NULL DEFAULT 1
);

-- Index for fast lookup: "give me all images for edge_id=5"
-- because without this, every image query scans the entire table.
CREATE INDEX idx_edge_images_edge_id ON edge_images(edge_id);

-- INDEXES

CREATE INDEX idx_edge_from ON edge(from_id);
CREATE INDEX idx_edge_to   ON edge(to_id);


-- OPTIONAL: add comments (very recommended)

COMMENT ON COLUMN node.tipe IS '0 = lantai, 1 = tangga, 2 = lift';
COMMENT ON COLUMN edge.accessible IS '0 = tidak, 1 = mandiri, 2 = butuh bantuan';


-- IMPORT DATA

COPY node (id, nama, tipe, x, y, is_destination)
FROM 'D:\angie\unpar\TA\node(1).csv'
DELIMITER ','
CSV HEADER;

COPY edge (from_id, to_id, accessible, weight)
FROM 'D:\angie\unpar\TA\edge(1).csv'
DELIMITER ','
CSV HEADER;


-- FIX SEQUENCES AFTER IMPORT

SELECT setval('node_id_seq', (SELECT MAX(id) FROM node));
SELECT setval('edge_id_seq', (SELECT MAX(id) FROM edge));


-- SAMPLE INSERT

INSERT INTO edge (from_id, to_id, accessible, weight) VALUES
  (6, 70, 1, 22.0),
  (5, 70, 2, 15.0),
  (10, 70, 1, 13.0),
  (70, 6, 1, 22.0),
  (70, 5, 2, 15.0),
  (70, 10, 1, 13.0);