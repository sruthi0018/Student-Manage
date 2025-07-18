const User = require("../../models/user");

exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;
    const staff = await User.create({ name, email, password, role: 'staff', permissions });
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};