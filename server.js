const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const { connection } = require("./config/db");

// config dot env file
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/api/v1/check", (req, res) => {
    res.send("welcome");
});



app.listen(process.env.port||8000, async () => {
    try {
         await connection;
         console.log("connected to db ".bgBlue.bold);
         console.log(`working on ${process.env.port || 8000} `.bgWhite.bold);
    } catch (err) {
         console.log(`${err}`.bgRed);
    }
});