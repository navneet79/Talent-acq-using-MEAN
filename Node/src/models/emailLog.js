const mongoose = require('mongoose');

var EmailLog = mongoose.model('emaillog', {
    from: { type: String} ,
    to: { type: String} ,
    subject: { type: String, required: true },
    body: { type: String, required: true 
    }
});

module.exports = { EmailLog };



