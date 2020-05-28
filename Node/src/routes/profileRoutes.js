const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Profile } = require('../models/profile');

router.get('/', (req, res) => {
    Profile.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving profile details :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Profile.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving profile :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var profileDetail = new Profile({
        title: req.body.title,
        fullName: req.body.fullName,
        city :req.body.city,
        mobile: req.body.mobile,
        email: req.body.email,
        skills: req.body.skills,
        experience: req.body.experience,
    });
    profileDetail.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in profilr Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var profileDetail = {
            title: req.body.title,
            fullName: req.body.fullName,
            mobile: req.body.mobile,
        city :req.body.city,
            
            email: req.body.email,
            skills: req.body.skills,
            experience: req.body.experience,
        };
    Profile.findByIdAndUpdate(req.params.id, { $set: profileDetail }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in profile Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Profile.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in profile Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;