const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const { connection } = require("./config/db");
const UserRouter = require("./routes/user.routes");
const AnalyticsRouter = require("./routes/analytics.routes");
const PostRouter = require("./routes/post.routes");

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

app.use("/api/v1/users",UserRouter)
app.use("/api/v1/analytics", AnalyticsRouter)
app.use("/api/v1/posts", PostRouter)



app.listen(process.env.port||8000, async () => {
    try {
         await connection;
         console.log("connected to db ".bgBlue.bold);
         console.log(`working on ${process.env.port || 8000} `.bgWhite.bold);
    } catch (err) {
         console.log(`${err}`.bgRed);
    }
});