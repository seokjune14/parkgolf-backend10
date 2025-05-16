const express = require('express');
const router = express.Router();
const {
  createApplication,
  updateApplicationStatus,
  getApplications,
  getApplicationsByInstructor // ✅ 추가
} = require('../controllers/applicationController');

// 신청 등록
router.post('/', createApplication);

// 상태 변경
router.put('/:appId/status', updateApplicationStatus);

// 신청 목록 조회 (필터링)
router.get('/', getApplications);

// ✅ 강사용 신청자 리스트 조회
// 예: GET /api/application/instructor/1
router.get('/instructor/:instNum', getApplicationsByInstructor);

module.exports = router;
