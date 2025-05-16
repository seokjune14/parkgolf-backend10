// routes/lessonApiRoutes.js
const express = require('express');
const router = express.Router();
const c = require('../controllers/lessonApiController');

// 전체 레슨 조회
router.get('/', c.getLessons);

// 강사 전용 레슨 조회
// 여기를 id 라우트보다 위로 옮깁니다.
router.get('/instructor/:userNum', c.getLessonsByInstructor);

// 레슨 상세 조회
router.get('/:id', c.getLessonById);

// 레슨 등록
router.post('/', c.createLesson);

// 레슨 수정
router.put('/:id', c.updateLesson);

// 레슨 삭제
router.delete('/:id', c.deleteLesson);

module.exports = router;
