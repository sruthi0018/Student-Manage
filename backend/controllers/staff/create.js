
const bcrypt = require("bcryptjs");
const sendEmail = require("../../utils/sendEmail");
const user = require("../../models/user");

exports.createStaff = async (req, res) => {
  try {
    const { name, email } = req.body;

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const staff = await user.create({
      name,
      email,
      password: hashedPassword,
      role: "staff",
       permissions: {
        student: {
          create: false,
          view: false,
          edit: false,
          delete: false
        }
      }
    });

    const subject = "Your Staff Login Credentials";
    const message = `
Hello ${name},

Your staff account has been created.

Email: ${email}
Password: ${randomPassword}

`;

    await sendEmail(email, subject, message);

    res
      .status(201)
      .json({ message: "Staff created and credentials sent to email." });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ message: "Server error" });
  }
};
