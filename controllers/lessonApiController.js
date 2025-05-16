// controllers/lessonApiController.js

const db = require("../db");

// 전체 레슨 조회
const getLessons = (req, res) => {
  const sql = "SELECT * FROM lesson";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("레슨 조회 실패:", err);
      return res.status(500).send("서버 에러");
    }
    res.json(rows);
  });
};

// 레슨 상세 조회
const getLessonById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM lesson WHERE lesNum = ?";
  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("레슨 상세 조회 실패:", err);
      return res.status(500).send("서버 에러");
    }
    if (rows.length === 0) {
      return res.status(404).send("레슨 없음");
    }
    res.json(rows[0]);
  });
};

// 강사 전용 레슨 조회
const getLessonsByInstructor = (req, res) => {
  const { userNum } = req.params;
  const sql = "SELECT * FROM lesson WHERE instNum = ?";
  db.query(sql, [userNum], (err, rows) => {
    if (err) {
      console.error("강사 레슨 조회 실패:", err);
      return res.status(500).send("서버 에러");
    }
    res.json(rows);
  });
};

// 레슨 등록
const createLesson = (req, res) => {
  const { userNum, lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime } = req.body;
  const sql = `
    INSERT INTO lesson
      (instNum, lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [userNum, lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime],
    (err, result) => {
      if (err) {
        console.error("레슨 등록 실패:", err);
        return res.status(500).send("서버 에러");
      }
      res.status(201).json({
        lesNum: result.insertId,
        instNum: userNum,
        lesName,
        lesinfo,
        lesPlace,
        lesDetailPlace,
        lesPrice,
        lesTime
      });
    }
  );
};

// 레슨 수정 (부분 업데이트 지원)
const updateLesson = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  // 업데이트 허용 필드 목록
  const allowedFields = [
    "lesName",
    "lesinfo",
    "lesPlace",
    "lesDetailPlace",
    "lesPrice",
    "lesTime"
  ];

  // SET 절과 파라미터 배열 조립
  const setClauses = [];
  const params = [];
  allowedFields.forEach(field => {
    if (body[field] !== undefined) {
      setClauses.push(`${field} = ?`);
      params.push(body[field]);
    }
  });

  if (setClauses.length === 0) {
    return res
      .status(400)
      .json({ message: "수정할 필드를 하나 이상 제공하세요." });
  }

  const sql = `UPDATE lesson SET ${setClauses.join(", ")} WHERE lesNum = ?`;
  params.push(id);

  db.query(sql, params, err => {
    if (err) {
      console.error("레슨 수정 실패:", err);
      return res.status(500).send("서버 에러");
    }

    // 수정 후 최신 데이터 조회
    db.query(
      "SELECT * FROM lesson WHERE lesNum = ?",
      [id],
      (err2, rows) => {
        if (err2) {
          console.error("수정 후 레슨 조회 실패:", err2);
          return res.status(500).send("서버 에러");
        }
        res.json(rows[0]);
      }
    );
  });
};

// 레슨 삭제
const deleteLesson = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM lesson WHERE lesNum = ?";
  db.query(sql, [id], err => {
    if (err) {
      console.error("레슨 삭제 실패:", err);
      return res.status(500).send("서버 에러");
    }
    res.sendStatus(204);
  });
};

module.exports = {
  getLessons,
  getLessonById,
  getLessonsByInstructor,
  createLesson,
  updateLesson,
  deleteLesson
};
