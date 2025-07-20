const User = require("../../models/user");

exports.updatePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    console.log(permissions, "permii");

    const staff = await User.findById(id); // ✅ FIXED

    if (!staff) return res.status(404).json({ message: "Staff not found" });

    staff.permissions = permissions; // ✅ Apply new permissions
    await staff.save(); // ✅ Save changes

    res.status(200).json({ message: "Permissions updated", staff });
  } catch (err) {
    res.status(500).json({ message: "Error updating permissions", error: err.message });
  }
};
