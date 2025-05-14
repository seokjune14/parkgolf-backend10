// server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── 미들웨어 설정 ────────────────────────────────
app.use(cors());               // 모든 도메인에서의 요청 허용
app.use(express.json());       // JSON 바디 파싱

// ─── 정적 파일 제공 ────────────────────────────────
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// ─── 라우트 등록 ───────────────────────────────────
app.use('/api', authRoutes);                   // 로그인/회원가입 등 auth
app.use('/api/lessons', lessonRoutes);         // 레슨 관련 CRUD
app.use('/api/cart', cartRoutes);              // 장바구니 관련
app.use('/api/user', userRoutes);              // 사용자 프로필 관련
app.use('/api/application', applicationRoutes); // 레슨 신청 관련

// ─── 기본 라우트 ─────────────────────────────────
app.get('/', (req, res) => {
  res.send('파크골프 레슨 예약 앱 서버 실행 중');
});

// ─── 서버 시작 ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
