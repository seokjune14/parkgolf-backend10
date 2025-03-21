const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// 미들웨어 설정
app.use(cors()); // 모든 요청 허용 (개발용)
app.use(express.json()); // JSON 파싱

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // ← 사용자에 맞게 수정
    password: '0809', // ← 비밀번호에 맞게 수정
    database: 'parkgolf_db',
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        return;
    }
    console.log('✅ MySQL 연결 성공');
});


// 📌 회원가입 API
app.post('/api/signup', (req, res) => {
    const { userName, userEmail, userPw } = req.body;

    if (!userName || !userEmail || !userPw) {
        return res.status(400).json({ error: '필수 항목 누락' });
    }

    // 1. 이메일 중복 체크
    const checkSql = 'SELECT * FROM user WHERE userEmail = ?';
    db.query(checkSql, [userEmail], (err, results) => {
        if (err) {
            console.error('이메일 중복 체크 오류:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        
        if (results.length > 0) {
            return res.status(409).json({ error: '이미 가입된 이메일입니다.' });
        }
        
        // 2. 새 사용자 등록
        const insertSql = 'INSERT INTO user (userName, userEmail, userPw) VALUES (?, ?, ?)';
        db.query(insertSql, [userName, userEmail, userPw], (err, result) => {
            if (err) {
                console.error('회원가입 오류:', err);
                return res.status(500).json({ error: '서버 오류' });
            }
            res.json({ success: true, userId: result.insertId });
        });
    });
});


// 📌 로그인 API
app.post('/api/login', (req, res) => {
    const { userEmail, userPw } = req.body;

    const sql = 'SELECT * FROM user WHERE userEmail = ? AND userPw = ?';
    db.query(sql, [userEmail, userPw], (err, results) => {
        if (err) {
        console.error('로그인 오류:', err);
        return res.status(500).json({ error: '서버 오류' });
        }

        if (results.length > 0) {
        const user = results[0];
        res.json({ success: true, user });
        } else {
        res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }
    });
});


// 기본 라우트
app.get('/', (req, res) => {
    res.send(' ParkGolf 레슨 예약 서버 실행 중');
});


// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
