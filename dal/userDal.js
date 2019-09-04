'use strict'

var db = require('./db');
const logger = require('../helper/logger');



module.exports = function () {
    return {
        userLoginPOST: function (obj, cb) {
            //These details will be fetched from DB
            var userObj = {
                userId: 1234,
                userTypeId: 1,
                userType: 'Administrator',
                screenName: 'Zafar',
                firstName: 'Zafar',
                middleName: '',
                lastName: 'Sultan'
            };
            var err = false;
            //Assuming the user is logging-in with valid credentials.
            if (err)
                cb(true, null);//There was an error or the user is not found in the database
            else
                cb(false, userObj);//User logged in succesfully
        }
    }
}

module.exports = function () {
    
}
        
