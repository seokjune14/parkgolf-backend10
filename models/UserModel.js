const db = require('../db');

// 사용자 위치 업데이트
const updateLocation = async (userNum, location1, location2) => {
    const sql = 'UPDATE `user` SET userlocation1 = ?, userlocation2 = ? WHERE userNum = ?';
    const [result] = await db.execute(sql, [location1, location2, userNum]);
    return result;
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
    updateLocation,
    getLocationFromDB, 
};
