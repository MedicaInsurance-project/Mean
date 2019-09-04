'use strict';

const { Pool } = require('pg');
var connPoolPromise = null;
var dbConfig = require('../config/dbConfig');
const logger = require('../helper/logger');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/advanceProject`,{useNewUrlParser: true, useFindAndModify: false})
.then(()=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log('databse not connected', err);
})


