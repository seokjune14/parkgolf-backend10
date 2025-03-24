const authService = require('../services/authService');


// 회원가입 API 컨트롤러
const signup = (req, res) => {
    const { userName, userEmail, userPw } = req.body;

    // 유효한 값 입력 체크
    if (!userName || !userEmail || !userPw) {
        return res.status(400).json({ error: '필수 항목 누락' });
    }

    // 이메일 중복 체크 후 회원가입
    authService.signup(userName, userEmail, userPw, (err, result) => {
        if (err) {
            console.error('회원가입 오류:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (result.exists) {
            return res.status(409).json({ error: '이미 가입된 이메일입니다.' });
        }

        res.json(result);
    });
};

// 로그인 API 컨트롤러
const login = (req, res) => {
    const { userEmail, userPw } = req.body;

    authService.login(userEmail, userPw, (err, result) => {
        if (err) {
            console.error('로그인 오류:', err);
            return res.status(500).json({ error: '서버 오류' });
        }

        if (result.success) {
            res.json(result);
        } else {
            res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }
    });
};

module.exports = {
    signup,
    login,
};
