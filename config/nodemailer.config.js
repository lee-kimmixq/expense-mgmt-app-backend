const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const user = process.env.USER;
const pass = process.env.PASS;

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'nickolas.goodwin@ethereal.email',
      pass: 'z528UuSgsAMz8yhvtD'
  }
};

const sendConfirmationEmail = async (name, email, confirmationCode) => {

  try {
    const transport = nodemailer.createTransport(mailConfig);

    const mailOptions = {
      from: 'no-reply@makecents.com',
      to: email,
      subject: "Please confirm your account",
      html:
        `<div>
          <h1>Verify your email</h1>
          <p>Hello ${name}!</p>
          <p>You're almost ready to start enjoying Make Cents.</p>
          <p>Click the button below to confirm your account.</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
      };

    // Set up the email options and delivering it
    const result = await transport.sendMail(mailOptions);
    return result;

  } catch(err) {
    console.log(err);
    return err;
  }
};

module.exports = sendConfirmationEmail;