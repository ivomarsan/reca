const jwt = require('jsonwebtoken');

module.exports = (app) => {
  'use strict';

  const User = app.models.user
      , controller = {}
    ;

  controller.auth = (req, res) => {
    User.findOne({ user: req.body.user }, (err, user) => {
      if(err) throw err;
      if(!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (user.pass != req.body.pass) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          let token = jwt.sign(user, process.env.JWT_SECRET || 'reca', {
            expiresIn: '6h'
          });
          res.status(201).json(
            { success: true
            , message: 'Enjoy your token!'
            , token: token
          });
        }
      }
    });
  };

  // controller.signin = (req, res) => {
  //   User.findOne({email: req.body.user, password: req.body.pass}, (err, user) => {
  //     if (err) {
  //       res.json({
  //           type: false,
  //           data: "Error occured: " + err
  //       });
  //     } else {
  //       if (user) {
  //         res.json({
  //             type: false,
  //             data: "User already exists!"
  //         });
  //       } else {
  //         let userModel = new User();
  //         userModel.username = req.body.user;
  //         userModel.password = req.body.pass;
  //         userModel.save((err, user) => {
  //           user.token = jwt.sign(user, process.env.JWT_SECRET);
  //           user.save((err, user1) => {
  //             res.json({
  //                 type: true,
  //                 data: user1,
  //                 token: user1.token
  //             });
  //           });
  //         })
  //       }
  //     }
  //   });
  // };

  controller.welcome = (req, res) => res.json({ message: 'Welcome to the coolest API on earth!' });
  // controller.setup = (req, res) => {
  //
  //   const test = new User({
  //     user: 'user',
  //     pass: 'pass',
  //     isAdm: true
  //   });
  //
  //   test.save((err) => {
  //     if (err) throw err;
  //
  //     console.log('User saved successfully');
  //     res.json({ success: true });
  //   });
  //
  // };

  return controller;
};
