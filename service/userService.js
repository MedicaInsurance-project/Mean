'use strict';

var db = require('../dal/db');
var userDal = require('../dal/UserDal')();
var cryptography = require('../helper/cryptography');
var cacheService = require('../helper/cache')();
var authService = require('../helper/auth')();


//This API checks whether user exists in database or not and return its data
module.exports.userLoginPOST = function (req, res, next) {
    var validator = require("email-validator");

    res.setHeader('Content-Type', 'application/json');
    var _params = req.swagger.params;

    var user = {};

    if (_params.email.value) {
        if (validator.validate(_params.email.value))
            user.email = _params.email.value.toLowerCase();
    }

    if (_params.password.value)
        user.password = cryptography.sha256(_params.password.value);

    if (_params.email.value && _params.password.value) {
        userDal.userLoginPOST(user, function (err, userDetails) {
            if (err) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
            }
            else {
                //Here we have successful login. Now store the token in cache.
                var token = authService.issueToken(userDetails.userId, userDetails.userType);
                res.setHeader("authToken", token);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
    else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
    }
}


module.exports.userDetailsGET = function (req, res, next) {

    res.getHeader('Content-Type', 'application/json');
    var _params = req.swagger.params;

    var user = {};
    
    if (_params.userId.value) {
        userDal.userDetailsGET(user, function (err, userDetails) {
            if (err) {
                res.setHeader("authToken", token);
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, data: null, message: "Invalid parameters." }));
            }
            else {
                //Here we have successful login. Now store the token in cache.
                var token = authService.issueToken(userDetails.userId, userDetails.userType);
                res.setHeader("authToken", token);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
    else {
        res.setHeader("authToken", token);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
    }
}

module.exports.userInsertData = (req, res)=>{

    res.setHeader('Content-Type', 'application/json');
    var _params = req.swagger.params;

    var user = {};

    if (_params.userId.value) {
        if (validator.validate(_params.userId.value))
            user.userId = _params.userId.value.toLowerCase();
    }

    if (_params.firstname.value) {
        if (validator.validate(_params.firstname.value))
            user.firstname = _params.firstname.value.toLowerCase();
    }

    if (_params.lastname.value) {
        if (validator.validate(_params.lastname.value))
            user.lastname = _params.lastname.value.toLowerCase();
    }

    if (_params.phone.value) {
        if (validator.validate(_params.phone.value))
            user.phone = _params.phone.value.toLowerCase();
    }

    if (_params.password.value)
        user.password = cryptography.sha256(_params.password.value);

    if (_params.userId.value && _params.password.value && _params.firstname.value && _params.lastname.value && _params.phone.value) {
        userDal.userInsertData(user, function (err, userDetails) {
            // USer DAta Insertion Post Value
            if (err) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
            }
            else {
                //Here we have successful login. Now store the token in cache.
                // var token = authService.issueToken(userDetails.userId, userDetails.userType);
                // res.setHeader("authToken", token);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
    else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
    }
}