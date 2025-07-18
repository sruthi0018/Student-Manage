const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    let defaultPermissions = {
      student: {
        create: false,
        view: false,
        edit: false,
        delete: false
      }
    };

    if (role === 'superadmin') {
      defaultPermissions.student = {
        create: true,
        view: true,
        edit: true,
        delete: true
      };
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      permissions: defaultPermissions
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.permissions
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};
