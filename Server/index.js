require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
  cors({
    origin:['http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
  })
);
connectDB();

app.get("/", (req, res) => {
  res.send("Yupp!! You are connected successfully");
});

const auth = require("./Auth");
app.use("/auth", auth);

const api = require("./APIs");
app.use("/api", api);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`port is connected on ${port}`);
});
