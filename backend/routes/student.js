const express = require('express');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/permissions');
const { createStudent } = require('../controllers/student/create');
const { getStudents } = require('../controllers/student/get');
const { updateStudent } = require('../controllers/student/update');
const { deleteStudent } = require('../controllers/student/delete');

const router = express.Router();

router.post('/', auth, checkPermission('create'), createStudent);
router.get('/', auth, checkPermission('view'), getStudents);
router.put('/:id', auth, checkPermission('edit'), updateStudent);
router.delete('/:id', auth, checkPermission('delete'), deleteStudent);

module.exports = router;
