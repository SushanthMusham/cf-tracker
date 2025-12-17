const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/auth.routes");
const cfRoutes = require("./routes/cf.routes");

const app = express();


// ---------- Global Middlewares ----------

app.use(cors());
app.use(express.json());


// ---------- Routes ----------

app.use("/api/auth", authRoutes);
app.use("/api/cf", cfRoutes);


// ---------- Health Check ----------

app.get("/",(req,res) => {
    res.send("CF tracker backend is running");
});

module.exports = app;
