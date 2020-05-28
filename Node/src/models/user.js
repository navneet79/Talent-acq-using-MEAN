const mongoose = require('mongoose');

var User = mongoose.model('user', {
    employeeId:{type : String , required : true},
    userName: { type: String, required: true ,unique :true},
    password: { type: String, required: true},
    project: { type: String},
    userRole: { type: String, required: true }
});

module.exports = { User };



