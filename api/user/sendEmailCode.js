const secret = require('../../secret');

const mongoUserDB = require('../../config/mongoUser');

const UserVerification = mongoUserDB.model('userVerification', require('../../schemas/User/userVerification'));

// Email handler
const nodemailer = require('nodemailer');
const generateCode = require('../../utils/generateCode');
let transporter = nodemailer.createTransport({
  service: "Zoho",
  auth: {
    user: secret.AUTH_EMAIL,
    pass: secret.AUTH_EMAIL_PASSWORD
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Properly connected using email address : " + secret.AUTH_EMAIL);
  }
})

// Send code to login via Email
const sendVerificationEmail = ({email}, res) => {
  generateCode(4).then(code => {
    UserVerification.find({email}).then(data => {
      if (data.length && (data[0].createdAt + 30000) > Date.now()) {
        res.status(403).json({
          error: true,
          message: "Previous code has been sent less than 30 seconds ago, you have to wait 30 seconds to request a new code.",
          data: null
        })
      } else {
        if (data.length) {
          UserVerification.deleteMany({email}).then(() => {
            const mailOptions = {
              from: `GPMM Alertes <${secret.AUTH_EMAIL}>`,
              to: email,
              subject: "Code d'accès pour l'application GPMM Alertes",
              html: `<p>Voici le code pour vous connecter à votre compte.</p>` + 
              `<p>Ce code <b>expire dans 10 minutes.</b></p><h1>${code}</h1>`,
            };
            const newVerification = new UserVerification({
              email: email,
              loginCode: code,
              createdAt: Date.now(),
              expiresAt: Date.now() + 600000,
            })
            newVerification.save().then(() => {
              transporter.sendMail(mailOptions).then(() => {
                // email sent and verification revord saved
                res.status(201).json({
                  error: false,
                  message: 'Account created. Account found. Email verification code sent.',
                  data: {email: email}
                })
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: true,
                  message: "Verification email code failed",
                  data: null
                })
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Couldnt save verification email data in database",
                data: null
              })
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Couldnt delete previous code from database.",
              data: null
            })
          });
        } else {
          const mailOptions = {
            from: `FriendlyBets <${secret.AUTH_EMAIL}>`,
            to: email,
            subject: "Login code for FriendlyBets",
            html: `<h1>${code}</h1><p>This is the code to complete the registration or login into your FriendlyBets account.</p>` + 
            `<p>This code <b>expires in 10 minutes.</b></p>`,
          };
          const newVerification = new UserVerification({
            email: email,
            loginCode: code,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
          })
          newVerification.save().then(() => {
            transporter.sendMail(mailOptions).then(() => {
              // email sent and verification revord saved
              res.status(201).json({
                error: false,
                message: 'Account created, Account found. Email verification code sent.',
                data: {email: email}
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Verification email code failed",
                data: null
              })
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Couldnt save verification email data in database",
              data: null
            })
          })
        }
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Failed to fetch from database",
        data: null
      })
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occurred while creating the login code.",
      data: null
    })
  })
}

module.exports = sendVerificationEmail;