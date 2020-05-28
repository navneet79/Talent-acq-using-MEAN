// const express = require('express');
// var router = express.Router();
// var ObjectId = require('mongoose').Types.ObjectId;

// var { Email } = require('../models/email');

// router.get('/', (req, res) => {
//     Email.find((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Retriving email details :' + JSON.stringify(err, undefined, 2)); }
//     });
// });


// router.put('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);

//         var emailDetails = {
//             subject: req.body.subject,
//             body: req.body.body
//         };
//     Email.findByIdAndUpdate(req.params.id, { $set: emailDetails }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in email data Update :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

