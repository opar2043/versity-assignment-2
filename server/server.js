const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",          // put your MySQL password if you have one
  database: "mobile_hunter",
});

db.connect((err) => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// ----------------------
//   Simple API routes
// ----------------------

// Just a check route
app.get("/", (req, res) => {
  res.send("Mobile Hunter MySQL API running...");
});

// Add to cart (like Mongo insertOne)
app.post("/cart", (req, res) => {
  const data = req.body;           // { brand, image, phone_name }

  const sql = "INSERT INTO cart SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Get all cart items (like find().toArray())
app.get("/cart", (req, res) => {
  const sql = "SELECT * FROM cart";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Delete cart item by id (like deleteOne({_id: ...}))
app.delete("/cart/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cart WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
