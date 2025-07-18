const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllStaffs } = require('../controllers/staff/get');
const { updateStaff } = require('../controllers/staff/update');
const { deleteStaff } = require('../controllers/staff/delete');
const { updatePermissions } = require('../controllers/staff/updatePermissions');


router.get('/', auth, getAllStaffs);
router.put('/:id', auth, updateStaff);
router.delete('/:id', auth, deleteStaff);
router.put('/:id/permissions', auth, updatePermissions);

module.exports = router;
