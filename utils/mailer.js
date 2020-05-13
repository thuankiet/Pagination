require("dotenv").config();

const nodeMailer = require("nodemailer");
const db = require("../db.js");

const adminEmail = process.env.EMAIL;
const adminPassWord = process.env.PASSWORD;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

module.exports.sendMail = (request, response) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassWord
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: adminEmail,
    to: response.locals.user.email,
    subject: "Limit Login",
    html: "<h1>Your account is currently locked</h1>"
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
};
