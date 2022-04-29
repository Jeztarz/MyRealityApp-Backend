const express = require('express');

const Checker = require('../middlewares/Checker');
const recordController = require('../controllers/recordController');

const UserModel = require('../models/userModel');

const router = express.Router()

router.use(Checker.checkSession);
router.use('/:recordId', Checker.checkRecord);


router.get('/', recordController.getRecords);
router.post('/', recordController.postRecord);
router.put('/:recordId', recordController.updateRecord);
router.delete('/:recordId', recordController.deleteRecord);
router.get('/:recordId', recordController.getRecordByID);


module.exports = router;