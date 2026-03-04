import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database
  const db = new Database("exports.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS exports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());

  // API Routes
  app.post("/api/export", (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    try {
      const stmt = db.prepare("INSERT INTO exports (title, content) VALUES (?, ?)");
      const info = stmt.run(title, JSON.stringify(content));
      
      res.json({ 
        success: true, 
        id: info.lastInsertRowid,
        message: "Data exported and saved to system successfully." 
      });
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Failed to save export" });
    }
  });

  app.get("/api/exports", (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM exports ORDER BY created_at DESC");
      const rows = stmt.all();
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exports" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
