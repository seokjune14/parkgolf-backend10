// routes/lessonApiRoutes.js
const express = require('express');
const router = express.Router();
const lessonApiController = require('../controllers/lessonApiController');

// 전체 레슨 조회
router.get('/', lessonApiController.getLessons);

// 레슨 상세 조회
router.get('/:id', lessonApiController.getLessonById);

// 강사 전용 레슨 조회
router.get('/instructor/:userNum', lessonApiController.getLessonsByInstructor);

// 레슨 등록
router.post('/', lessonApiController.createLesson);

// 레슨 수정
router.put('/:id', lessonApiController.updateLesson);

// 레슨 삭제
router.delete('/:id', lessonApiController.deleteLesson);

module.exports = router;
