const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userlist = new Schema({
    name: {
        required: true,
        type: String,
        required: true
    },
    email: {
        required: true,
        type: String,
        required: true,
    },
    age: {
        required: true,
        type: Number,
        required: true
    },
    company: {
        required: true,
        type: String,
        required: true
    },
    createdDate: {
        required: true,
        type: Date,
        required: true
    },
    salary: {
        required: true,
        type: String,
        required: true
    },
    workExperence: {
        required: true,
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('usersList', userlist)