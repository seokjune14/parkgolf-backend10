const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 위치 저장 라우트
router.post('/location', userController.saveLocation);
router.get('/location/:userNum', userController.getLocation);

module.exports = router;
