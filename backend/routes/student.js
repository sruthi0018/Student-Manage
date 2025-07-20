const express = require('express');
const authMiddleware = require('../middleware/auth');
const checkPermission = require('../middleware/permissions');
const { createStudent } = require('../controllers/student/create');
const { getStudents } = require('../controllers/student/get');
const { updateStudent } = require('../controllers/student/update');
const { deleteStudent } = require('../controllers/student/delete');
const { getStudentById } = require('../controllers/student/getById');

const router = express.Router();

router.post('/', authMiddleware, checkPermission('create'), createStudent);
router.get('/', authMiddleware, checkPermission('view'), getStudents);
router.get('/:id', authMiddleware, checkPermission('view'), getStudentById);
router.put('/:id', authMiddleware, checkPermission('edit'), updateStudent);
router.delete('/:id', authMiddleware, checkPermission('delete'), deleteStudent);

module.exports = router;
