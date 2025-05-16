const pool = require("../db");

// 신청 등록
const createApplication = (req, res) => {
  const { userNum, lesNum } = req.body;
  pool.query(
    "INSERT INTO application (userNum, lesNum) VALUES (?, ?)",
    [userNum, lesNum],
    (err, result) => {
      if (err) {
        console.error("신청 등록 실패:", err);
        return res.status(500).json({ message: "서버 오류" });
      }
      res.status(201).json({ message: "신청 완료", appId: result.insertId });
    }
  );
};

// 신청 상태 변경
const updateApplicationStatus = (req, res) => {
  const { appId } = req.params;
  const { status } = req.body;
  pool.query(
    "UPDATE application SET status = ? WHERE appId = ?",
    [status, appId],
    (err) => {
      if (err) {
        console.error("상태 변경 실패:", err);
        return res.status(500).json({ message: "서버 오류" });
      }
      res.status(200).json({ message: "상태 업데이트 완료" });
    }
  );
};

// 신청 목록 조회 (userNum 또는 lesNum 필터링)
const getApplications = (req, res) => {
  const { userNum, lesNum } = req.query;
  let query = "SELECT * FROM application";
  const conditions = [];
  const values = [];

  if (userNum) {
    conditions.push("userNum = ?");
    values.push(userNum);
  }
  if (lesNum) {
    conditions.push("lesNum = ?");
    values.push(lesNum);
  }
  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }

  pool.query(query, values, (err, rows) => {
    if (err) {
      console.error("신청 조회 실패:", err);
      return res.status(500).json({ message: "서버 오류" });
    }
    res.status(200).json(rows);
  });
};

// ✅ 강사용 신청 리스트 조회
const getApplicationsByInstructor = (req, res) => {
  const { instNum } = req.params;
  const sql = `
    SELECT 
      a.appId,
      a.status,
      a.createdAt,
      u.userNum AS studentNum,
      u.userName AS studentName,
      u.userImg,
      u.userlocation1,
      u.userlocation2,
      l.lesNum,
      l.lesName,
      l.lesPlace
    FROM application a
    JOIN user u ON a.userNum = u.userNum
    JOIN lesson l ON a.lesNum = l.lesNum
    WHERE l.instNum = ?
    ORDER BY a.createdAt DESC
  `;
  pool.query(sql, [instNum], (err, results) => {
    if (err) {
      console.error("신청 리스트 조회 실패:", err);
      return res.status(500).json({ message: "서버 오류" });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  createApplication,
  updateApplicationStatus,
  getApplications,
  getApplicationsByInstructor
};
