//api's
'use strict';



var user = require('../service/userService');

module.exports.userLoginPOST = function (req, res, next) {
    user.userLoginPOST(req, res, next);
};

module.exports.userDetailsGET = function (req, res, next) {
    user.userDetailsGET(req, res, next);
};  

module.exports.userInsertData = function (req, res, next) {
    user.userInsertData(req, res, next);
};

