const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Ride = require("./models/ride.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const app = express();

const bcryptsalt = bcrypt.genSaltSync(10);
const jwtSecret = "a jdkjnvkjjfkbm  ";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
  })
);

app.post("/myrides", async (req, res) => {
  console.log("Post My Rides: "+req.body); 
  res.send("Post My Ride");
  const ride = new Ride(req.body);
  ride
    .save()
    .then((savedRide) => res.status(201).json(savedRide))
    .catch((error) => {
      console.error("Error saving ride:", error);
      res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    });
});

app.get("/myrides", async (req, res) => {
  console.log("Get My Rides: "+req.body);
  console.log("Get My Ride")
  const userId = req.params.userId;
  try {
    const rides = await Ride.find({ userId: userId });
    res.status(200).json(rides);
    console.log(rides);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch rides", error: error.message });
  }
});

app.listen(4000,()=>{
  console.log("Server running on http://localhost:4000");
});
