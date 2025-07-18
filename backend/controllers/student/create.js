const Student = require("../../models/student");

exports.createStudent = async (req, res) => {
  try {
    const data = req.body;

    const student = await Student.create(data);
    res.status(201).json({ message: "Student created", student });
  } catch {
    res.status(500).json({ message: "Error creating student" });
  }
};