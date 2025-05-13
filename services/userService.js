const UserModel = require('../models/UserModel');

const saveLocation = async (userNum, userlocation1, userlocation2) => {
    return await UserModel.updateLocation(userNum, userlocation1, userlocation2);
};


const getLocation = (userNum, callback) => {
    UserModel.getLocationFromDB(userNum, callback);
};

module.exports = {
    saveLocation,
    getLocation,
};
