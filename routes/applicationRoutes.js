const express = require('express');
const router = express.Router();
const {
  createApplication,
  updateApplicationStatus,
  getApplications
} = require('../controllers/applicationController');

// POST /api/application/       → 신청 등록
router.post('/', createApplication);

// PUT /api/application/:appId  → 상태 변경
router.put('/:appId/status', updateApplicationStatus);

// GET /api/application/        → 신청 목록 조회 (필터링 쿼리 가능)
router.get('/', getApplications);

module.exports = router;
