const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getAllStaffs } = require('../controllers/staff/get');
const { updateStaff } = require('../controllers/staff/update');
const { deleteStaff } = require('../controllers/staff/delete');
const { updatePermissions } = require('../controllers/staff/updatePermissions');
const { getStaffById } = require('../controllers/staff/getById');
const { createStaff } = require('../controllers/staff/create');


router.post('/',authMiddleware,createStaff)
router.get('/', authMiddleware, getAllStaffs);
router.get('/:id', authMiddleware, getStaffById);
router.put('/:id', authMiddleware, updateStaff);
router.delete('/:id', authMiddleware, deleteStaff);
router.put('/:id/permissions', authMiddleware, updatePermissions);

module.exports = router;
