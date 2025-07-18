const mongoose = require('mongoose');

const permissionsSchema = new mongoose.Schema({
  student: {
    create: { type: Boolean, default: false },
    view: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['superadmin', 'staff'],
    required: true
  },
  permissions: permissionsSchema
});

module.exports = mongoose.model('User', userSchema);
