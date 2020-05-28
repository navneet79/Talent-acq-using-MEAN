const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer');
var { EmailLog } = require('../models/emailLog');
var { User } = require('../models/user');
var { Email } = require('../models/email');

router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving user details :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/email', (req, res) => {
    Email.findOne((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving email details :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
   

    User.findOne({userName: req.params.id}, (err, doc) => {
        if (!err) { console.log(doc);res.send(doc); }
        else { console.log('Error in Retriving user :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    var userDetail = new User({
        userName: req.body.userName,
        password: req.body.password,
        userRole: req.body.userRole,
        employeeId : req.body.employeeId,
        project : req.body.project
        // salary: req.body.salary,
    });
    userDetail.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in user Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/saveEmail',(req,res) => {
    var emailDetail = new EmailLog({
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      body: req.body.body});
      mailData['to'] = emailDetail.to;
        mailData['from'] = emailDetail.from;
        mailData['subject'] = emailDetail.subject;
        mailData['html'] = emailDetail.body;
        console.log(mailData);
        emailDetail.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        res.send({data:"Record has been Inserted."});
      }
    });
  
    transporter.sendMail(mailData, function(err) {
      if(err){
          console.log("Error in mail",err);
      }
      console.log("Mail sent successfully");
      });
  });
  

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var userDetail = {
            userName: req.body.userName,
            password: req.body.password,
            userRole: req.body.userRole,
            employeeId : req.body.employeeId,
            project : req.body.project
        };
    User.findByIdAndUpdate(req.params.id, { $set: userDetail }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in user Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/email/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var emailDetails = {
            subject: req.body.subject,
            body: req.body.body
            
        };
    Email.findByIdAndUpdate(req.params.id, { $set: emailDetails }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in email Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


var mailData= {
    from: '',
    to: 'receiver@sender.com',
    subject: 'Message title',
    html: 'HTML version of the message'
  };

  var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'localhost',
    port: process.env.MAIL_PORT || 1025,
    secure: process.env.MAIL_SECURE || false,
    tls: {
      rejectUnauthorized: false
    }
  });
  

module.exports = router;