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
        `<div style="background: rgba(1, 0, 6, 0.8); padding: 50px">
          <p style="color: #B4B4B4"> ❤ Make Cents</p>    
          <h1 style="color: #efefef">Verify your email</h1>
          <p style="color: #efefef">Hello ${name}!</p>
          <p style="color: #efefef; ">Click the button below to confirm your account<br>and start enjoying Make Cents.</p>
          <button style="margin-top: 1.5em; background-color: #5948D3; color: #efefef; height: 3em; width: 9em; border-style: none; border-radius: 0.5em" ><a href=http://localhost:3000/confirm/${confirmationCode} style="text-decoration: none; color: #efefef">Click here</a></button>
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