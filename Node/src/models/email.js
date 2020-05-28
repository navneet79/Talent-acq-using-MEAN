const mongoose = require('mongoose');

var Email = mongoose.model('email', {
    subject: { type: String, required: true },
    body: { type: String, required: true 
    }
});

module.exports = { Email };



