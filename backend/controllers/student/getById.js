
const Student = require('../../models/student');

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching Student by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
