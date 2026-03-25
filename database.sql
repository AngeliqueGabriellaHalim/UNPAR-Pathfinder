
CREATE TABLE node (
  id    SERIAL PRIMARY KEY,
  nama   VARCHAR(100) NOT NULL,  

  -- What kind of node is this?
  --   0 = lantai (regular floor/room)
  --   1 = tangga (staircase)
  --   2 = lift   (elevator)
  tipe           SMALLINT NOT NULL CHECK (tipe IN (0, 1, 2)),

  -- X and Y coordinates. These are used by A* to calculate heuristic
 
  x              FLOAT NOT NULL,
  y              FLOAT NOT NULL,

  -- Can this node be selected as a destination 
  is_destination  BOOLEAN NOT NULL DEFAULT FALSE
);



-- TABLE: edge

CREATE TABLE edge (
  id         SERIAL PRIMARY KEY,

 
  -- ON DELETE CASCADE = if the node is deleted, delete this edge too
  from_id    INT NOT NULL REFERENCES node(id) ON DELETE CASCADE,

  to_id      INT NOT NULL REFERENCES node(id) ON DELETE CASCADE,

  -- Can a person with disabilities use this path?
  --   0 = tidak accessible (cannot use)
  --   1 = bisa mandiri     (fully accessible, no help needed)
  --   2 = accessible with assist (needs help but physically possible)
  accessible SMALLINT NOT NULL DEFAULT 0 CHECK (accessible IN (0, 1, 2)),
  petunjuk   TEXT,
  weight     FLOAT NOT NULL DEFAULT 1.0
);


--INDEXES

CREATE INDEX idx_edge_from ON edge(from_id);
CREATE INDEX idx_edge_to   ON edge(to_id);


COPY node (id, nama, tipe, x, y, is_destination)
FROM 'D:\angie\unpar\TA\node(1).csv'
DELIMITER ','
CSV HEADER;

COPY edge (from_id, to_id, accessible, petunjuk, weight)
FROM 'D:\angie\unpar\TA\edge(1).csv'
DELIMITER ','
CSV HEADER;

-- Fix auto-increment sequences after manually importing IDs
-- so future INSERTs don't collide with existing IDs
SELECT setval('node_id_seq', (SELECT MAX(id) FROM node));
SELECT setval('edge_id_seq', (SELECT MAX(id) FROM edge));

INSERT INTO edge (from_id, to_id, accessible, petunjuk, weight) VALUES
  (6, 70, 1, 'barat',22.0),
  (5, 70, 2, '5 barat 10 utara', 15.0),
  (10, 70, 1, '3 selatan 10 barat', 13.0),
  (70,6, 1, '',22.0),
  ( 70,5, 2, '', 15.0),
  (70, 10, 1, '', 13.0);


Select * from edge
select * from node