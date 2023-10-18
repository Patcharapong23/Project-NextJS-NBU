const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = 4000;

require("dotenv").config();
//ดึงมากจาก
const UserRoute = require("./routes/uset.routes");
const Room_info = require("./models/room.management.models");
const Student_info = require("./models/user.Student.models"); // แก้ไข path ของ collection
const User = require("./models/๊user.models");
const fetch_user_data = require("./models/๊user.models");

const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", UserRoute);
//Student
app.post("/student-info", async (req, res) => {
  const {
    studentId,
    name,
    faculty,
    department,
    telephoneNumber,
    contractDate,
  } = req.body;

  try {
    const data = new Student_info({
      studentId,
      name,
      faculty,
      department,
      telephoneNumber,
      contractDate,
    });

    await data.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Register User
app.post("/Manage_User", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login User
app.post("/Login_User", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch User Data
app.get("/fetch_user_data", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const decodedToken = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    const user = await fetch_user_data.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

///GET
app.get("/Info", async (req, res) => {
  const { floor, roomNumber } = req.query;

  try {
    let query = {};

    if (floor) {
      query.floor = floor;
    }

    if (roomNumber) {
      query.roomNumber = roomNumber;
    }

    const rooms = await Room_info.find(query);

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// รับข้อมูลห้องทั้งหมด

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
