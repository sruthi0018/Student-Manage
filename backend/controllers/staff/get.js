const User = require("../../models/user");

exports.getAllStaffs = async (req, res) => {
  const staffs = await User.find({ role: 'staff' })
  res.json(staffs);
};