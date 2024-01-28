require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const seedDB = require("./seed");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const quoteRoute = require("./api/quoteRoute");
const userRoute = require("./api/userRoute");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://quotify-frontend-two.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// seedDB();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Root Route");
});

app.use(userRoute);
app.use(quoteRoute);

const PORT = process.env.PORT || 5050;
const MONGODBURL = process.env.MONGODBURL;
mongoose
  .connect(MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port 5050");
    });
  })
  .catch((err) => {
    console.log("MongoDB Not Connected" + err);
  });
