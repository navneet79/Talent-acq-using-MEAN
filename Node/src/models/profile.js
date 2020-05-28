const mongoose = require('mongoose');

var Profile = mongoose.model('profile', {
    title: { type: String, required: true },
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    mobile: { type: String, required:true, minlength: 10},
    email: { type: String, required:true},
    skills: [String],
    experience: {type: String}

});

module.exports = { Profile };