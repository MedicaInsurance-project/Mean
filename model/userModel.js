const mongoose = require('mongoose');

const userDetailsSchema= new mongoose.Schema({
    usedID: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },



});

let userDetails = mongoose.model('userDetails',userDetailsSchema);


