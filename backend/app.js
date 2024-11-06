const express = require("express");
const cors = require("cors");
const User = require("./models/User.js");
const Ride = require("./models/ride.js");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const app = express();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const jwtSecret = "aetalkdgathtlkadfaiutkassfsdnfkaksn";

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: "https://ride-pooling.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.put("/changepassword", async (req, res) => {
  const { userId, oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(userId);
  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatched) {
    return res.send("Old password is incorrect");
  }
  if (newPassword !== confirmPassword) {
    return res.send("password does not match");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });
  res.send("Updated Password Successfully");
});

app.put("/update-profile", async (req, res) => {
  const { name, email, phone, profilePic, userID } = req.body;
  const newUserData = {
    name,
    email,
    phone,
  };
  const user = await User.findById(userID);
  if (profilePic !== user.avatar.url) {
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  await User.findByIdAndUpdate(userID, newUserData);
  res.status(200).json("Updated Profile Successfully");
});
// Publish Rides
app.post("/myrides", async (req, res) => {
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

// Display user rides
app.get("/myrides", async (req, res) => {
  try {
    const rides = await Ride.find().populate("passengers.userId", "name email");
    res.status(200).json(rides);
    // console.log(rides);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch rides", error: error.message });
  }
});
// Display All Rides
app.get("/myrides/all", async (req, res) => {
  const allRides = await Ride.find().populate("creator", "name email phone");
  res.status(200).json(allRides);
});

//Edit Ride
app.get("/myrides/:rideId", async (req, res) => {
  const { rideId } = req.params;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.json(ride);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch ride details", error: error.message });
  }
});
// store edited
app.put("/myrides/:rideId", async (req, res) => {
  const { rideId } = req.params;
  const rideUpdates = req.body;

  try {
    const updatedRide = await Ride.findByIdAndUpdate(rideId, rideUpdates, {
      new: true,
    });
    if (!updatedRide) {
      return res.status(404).send("Ride not found");
    }
    res.json(updatedRide);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating ride", error: error.message });
  }
});
//del ride

app.delete("/myrides/:rideId", async (req, res) => {
  console.log("DELETE request received for ride ID:", req.params.rideId);
  const deleteRideId = await Ride.findById(req.params.rideId);
  console.log("Deleted ID: ", deleteRideId);
  if (!deleteRideId) {
    return res.status(400).json("Invalid Ride ID");
  }
  await deleteRideId.deleteOne();
  res.status(200).json("Deleted Successfully");
});

//Join Ride
app.post("/myrides/join/:rideId", async (req, res) => {
  const { rideId } = req.params;
  const { seatsRequested, userId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(rideId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({ message: "Invalid ride or user ID format" });
  }

  if (!Number.isInteger(seatsRequested) || seatsRequested <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid number of seats requested" });
  }

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.seats < seatsRequested) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    const existingPassenger = ride.passengers.find(
      (passenger) => passenger.userId.toString() === userId
    );

    if (existingPassenger) {
      return res.status(400).json({ message: "User already joined the ride" });
    }

    ride.seats -= seatsRequested;
    ride.passengers.push({ userId, seatsBooked: seatsRequested });

    await ride.save();

    res
      .status(200)
      .json({ message: "Successfully joined the ride", seats: ride.seats });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to join ride", error: error.message });
  }
});

app.get("/joined", async (req, res) => {
  const userId = req.query.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const rides = await Ride.find({
      "passengers.userId": new mongoose.Types.ObjectId(userId),
    })
      .populate("creator", "name email")
      .populate("passengers.userId", "name email");

    // console.log(rides); ////++++++++
    res.json(rides);
  } catch (error) {
    console.error("Error fetching joined rides:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

//search
app.get("/search", async (req, res) => {
  const { from, to, date, seats } = req.query;
  let query = {};
  if (from) {
    query.from = { $regex: from, $options: "i" };
  }
  if (to) {
    query.to = { $regex: to, $options: "i" };
  }
  if (date) {
    const dateObj = new Date(date);
    const nextDay = new Date(date);
    nextDay.setDate(dateObj.getDate() + 1);
    query.departure = {
      $gte: dateObj,
      $lt: nextDay,
    };
  }
  if (seats) {
    query.seats = { $gte: parseInt(seats) }; // Ensure there are at least as many seats as requested
  }
  try {
    const rides = await Ride.find(query).populate("creator", "name email");
    res.json(rides);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Cancel Ride

app.patch("/rides/:rideId/cancel", async (req, res) => {
  const { rideId } = req.params;
  const { userId } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    const passengerIndex = ride.passengers.findIndex((p) =>
      p.userId.equals(userId)
    );
    if (passengerIndex === -1) {
      return res
        .status(400)
        .json({ message: "User is not a passenger of this ride" });
    }

    // Reclaim the booked seats
    const seatsToReclaim = ride.passengers[passengerIndex].seatsBooked;
    ride.seats += seatsToReclaim;
    ride.passengers.splice(passengerIndex, 1);

    await ride.save();
    res
      .status(200)
      .json({ message: "Ride cancellation successful", updatedRide: ride });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to cancel ride", error: error.message });
  }
});

//FeedBack
app.post("/rides/:rideId/feedback", async (req, res) => {
  const { rideId } = req.params;
  const { userId, comment, rating } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).send("Ride not found");
    }

    // Optionally, check if the user has joined this ride
    const passengerIndex = ride.passengers.findIndex(
      (p) => p.userId.toString() === userId
    );
    if (passengerIndex === -1) {
      return res.status(403).send("User did not join this ride");
    }

    // Add feedback
    ride.feedbacks.push({ userId, comment, rating });
    await ride.save();
    res.status(201).json({
      message: "Feedback added successfully",
      feedbacks: ride.feedbacks,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res
      .status(500)
      .json({ message: "Error adding feedback", error: error.message });
  }
});

// +++++++++========================================================================================++++++
app.get("/test", (req, res) => {
  console.log("Test Successfully");
});

app.post("/register", async (req, res) => {
  const { name, email, password, phone, avatar } = req.body;
  if (!email || !phone) {
    return res.status(400).json({ message: "Email and phone no are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    myCloud = {
      public_id:
        "https://asset.cloudinary.com/duqy1baw3/3823cfd540a736c33eaf2b5555ff576f",
      secure_url:
        "https://res.cloudinary.com/duqy1baw3/image/upload/v1714415910/avatars/Profile_ymxnex.png",
    };
    const user = await User.create({
      name,
      email,
      phone,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      password: await bcrypt.hash(password, 10),
    });
  } catch (e) {
    res.status(422).json(e);
  }
  res.send("Registration Successful. Now you can log in");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passok = bcrypt.compareSync(password, userDoc.password);
    if (passok) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true, // Keeps the cookie inaccessible to client-side JavaScript for security
              sameSite: "None", // Cross-site cookie (set to None if needed)
              maxAge: 24 * 60 * 60 * 1000, // Cookie will expire in 24 hours
            })
            .json(userDoc);
          // res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass Not Ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const userId = req.params.userId;
  const { token } = req.cookies;
  if (token && token !== "j:null") {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, phone, _id, avatar } = await User.findById(
        userData.id
      );
      res.json({
        name,
        email,
        phone,
        _id,
        avatar,
      });
    });
  } else {
    res.json(null);
  }
});
app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "None",
      maxAge: 0,
    })
    .json({ success: true });
});

module.exports = app;
