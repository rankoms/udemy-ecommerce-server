const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((error) => console.log("DB CONNECTION ERROR", error));

// midlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
fs.readdirSync("./routes").map((r) =>
    app.use("/api", require("./routes/" + r))
);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is Runing on port ${port}`));
