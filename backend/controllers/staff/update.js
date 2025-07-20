const bcrypt = require("bcryptjs");
const sendEmail = require("../../utils/sendEmail");
const User = require("../../models/user");

exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) return res.status(404).json({ message: 'Staff not found' });

    const emailChanged = updates.email && updates.email !== existingUser.email;

    if (emailChanged) {
      const newPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      updates.password = hashedPassword; 


      const subject = "Your Updated Staff Login Credentials";
      const message = `
Hello ${updates.name || existingUser.name},

Your staff account email has been updated.

New Email: ${updates.email}
New Password: ${newPassword}

Please use this new password to login.
`;

      await sendEmail(updates.email, subject, message);
    }

    const updatedStaff = await User.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ message: 'Staff updated successfully', staff: updatedStaff });

  } catch (err) {
    console.error("Update Staff Error:", err);
    res.status(500).json({ message: 'Error updating staff', error: err.message });
  }
};
