const User = require("../../models/user");

exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const staff = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json({ message: 'Staff updated', staff });
  } catch (err) {
    res.status(500).json({ message: 'Error updating staff', error: err.message });
  }
};