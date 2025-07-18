const Student = require("../../models/student");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch {
    res.status(500).json({ message: "Error fetching students" });
  }
};