const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || "12345",
  database: "expenses_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) return res.json({ error: err });
    res.json(results);
  });
});

app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;
  db.query(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title, amount],
    (err, result) => {
      if (err) return res.json({ error: err });
      res.json({ message: "Expense added!" });
    }
  );
});

app.listen(5000, () => console.log("Backend running on port 5000"));
