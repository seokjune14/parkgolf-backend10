const db = require('../db');

// 사용자 위치 업데이트
const updateUserLocation = (userNum, location1, location2, callback) => {
    const sql = 'UPDATE user SET userlocation1 = ?, userlocation2 = ? WHERE userNum = ?';
    db.query(sql, [location1, location2, userNum], callback);
};

// db에서 위치정보 가져오기
const getLocationFromDB = (userNum, callback) => {
    const sql = 'SELECT userlocation1, userlocation2 FROM user WHERE userNum = ?';
    db.query(sql, [userNum], (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, null);
        callback(null, results[0]);
    });
};

module.exports = {
    updateUserLocation,
    getLocationFromDB, 
};
