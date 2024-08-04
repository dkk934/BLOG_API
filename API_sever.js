// Importing required modules
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Database connection using a connection pool
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true
});


// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utility function to handle errors consistently
const handleError = (res, error, message = "Internal Server Error", statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({ error: message });
};

// GET all posts from a specified table or default to "home"
app.get("/posts/:table?", async (req, res) => {
  const table = req.params.table || "home";
  try {
    const result = await pool.query(`SELECT * FROM public.${table}`);
    res.json(result.rows);
  } catch (error) {
    handleError(res, error, "Error fetching posts");
  }
});

// Show all tables in the public schema
app.get("/tables/all", async (req, res) => {
  const query = `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `;
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    handleError(res, error, "Error fetching tables");
  }
});

// GET a specific post by id from the "home" table
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM home WHERE id = $1", [id]);
    const post = result.rows[0];
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    handleError(res, error, "Error fetching post");
  }
});

// POST a new post to the "home" table
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  const date = new Date();
  const query = `
    INSERT INTO home (title, content, author, time) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [title, content, author, date]);
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    handleError(res, error, "Error creating post");
  }
});

// PATCH a specific post by id in the "home" table
app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const query = `
    UPDATE home 
    SET title = COALESCE($1, title), content = COALESCE($2, content), author = COALESCE($3, author) 
    WHERE id = $4 
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [title, content, author, id]);
    const updatedPost = result.rows[0];
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (error) {
    handleError(res, error, "Error updating post");
  }
});

// DELETE a specific post by id from the "home" table
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM home WHERE id = $1 RETURNING *";
  try {
    const result = await pool.query(query, [id]);
    const deletedPost = result.rows[0];
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (error) {
    handleError(res, error, "Error deleting post");
  }
});

// POST to create a new table with inheritance from the "home" table
app.post("/posts/data", async (req, res) => {
  const { table } = req.body;
  const query = `
    CREATE TABLE IF NOT EXISTS public.${table} (
      -- Define specific columns if needed
    ) INHERITS (public.home) TABLESPACE pg_default;
  `;
  try {
    await pool.query(query);
    res.json({ message: `Table ${table} created or already exists.` });
  } catch (error) {
    handleError(res, error, "Error creating table");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
