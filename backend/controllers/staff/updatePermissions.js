const User = require("../../models/user");

exports.updatePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;
    const staff = await User.findByIdAndUpdate(id, { permissions }, { new: true });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json({ message: 'Permissions updated', staff });
  } catch (err) {
    res.status(500).json({ message: 'Error updating permissions', error: err.message });
  }
};