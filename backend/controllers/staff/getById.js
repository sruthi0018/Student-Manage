const User = require("../../models/user");

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await User.findById(id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
