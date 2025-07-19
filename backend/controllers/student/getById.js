
const Student = require('../../models/student');

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
console.log(student,"stuu")
    res.json(student);
  } catch (error) {
    console.error('Error fetching Student by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
