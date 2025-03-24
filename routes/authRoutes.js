const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signup', authController.signup); // 회원가입 요청 처리 라우터
router.post('/login', authController.login); // 로그인 요청 처리 라우터

module.exports = router;
