const UserModel = require('../models/UserModel');

const saveLocation = (userNum, location1, location2, callback) => {
    if (!userNum || !location1 || !location2) {
        return callback(new Error('필수 항목 누락'));
    }

    UserModel.updateUserLocation(userNum, location1, location2, callback);
};

const getLocation = (userNum, callback) => {
    UserModel.getLocationFromDB(userNum, callback);
};

module.exports = {
    saveLocation,
    getLocation,
};
