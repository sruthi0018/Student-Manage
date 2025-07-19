const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

const token = jwt.sign(
  { id: user._id }, 
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);


    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};