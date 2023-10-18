const UserService = require("../services/uset.services");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    await UserService.registerUser(email, password);
    res.json({ status: true, success: "User registered successfully" });
  } catch (err) {
    throw err;
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบว่ามีอีเมลและรหัสผ่านที่ถูกส่งมาหรือไม่
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide email and password" });
    }

    // ตรวจสอบว่ามีผู้ใช้นี้อยู่ในระบบหรือไม่
    const user = await UserService.checkUser(email);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    // สร้าง Token (ให้ติดตั้ง jsonwebtoken ถ้ายังไม่ได้ติดตั้ง)
    const jwt = require("jsonwebtoken");
    const secretKey = process.env.JWT_SECRET; // ให้ตั้งค่า JWT_SECRET ในไฟล์ .env

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
