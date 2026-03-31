require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const app = express();

connectDB();
// Root route (IMPORTANT for "Cannot GET /" fix)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use(express.json());
app.use(cors());
app.use(helmet());

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/trip", require("./routes/trip.routes"));
app.use("/api/items", require("./routes/items.routes")); // fixed

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} 🚀`),
);
