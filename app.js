const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const poll = require("./routes/poll");

const app = express();
require('dotenv').config();

// DB config
require("./config/db");

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser middler
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Enable CORS
app.use(cors());

app.use("/poll", poll);

const port=3000;

app.listen(port, () => console.log("Server started on port", 3000))
