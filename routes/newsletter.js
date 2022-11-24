const router = require('express').Router();
const User = require('../models/User.model');

//Following is for the contact form
const nodeMailer = require('nodemailer');
const { request } = require('express');

// Get contact page
// router.get('/contact', (req, res, next) => {
//   res.render('information/contact.hbs');
// });

router.post('/', (req, res, next) => {
    console.log("##User Email###:",req.body.email);
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'letusplay.iron@gmail.com',
      pass: process.env.googlepass,
    },
  });


  const mailOptions = {
    from: 'letusplay.iron@gmail.com',
    to: 'letusplay.iron@gmail.com',
    subject: "test",
    text: `You got a message from
        Email: ${req.body.email}
        Message: `,
  };
  const mailResponse = {
    from: 'letusplay.iron@gmail.com',
    to: req.body.email,
    subject: 'LET us PlAY Newsletter',
    text: `Hey! This is the first Newsletter from Let's Play...\n${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('You have subscribed successfuly!');
      transporter.sendMail(mailResponse, (error, info));
    }
  });
});

module.exports = router;
