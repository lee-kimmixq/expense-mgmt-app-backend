const nodemailer = require("nodemailer");
// const { google } = require('googleapis');

// const user = process.env.USER;
// const pass = process.env.PASS;
// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;
// const refreshToken = process.env.REFRESH_TOKEN;
// const redirectUri = process.env.REDIRECT_URI;
// const accessToken = process.env.ACCESS_TOKEN;

// const transport = nodemailer.createTransport({
//   // host: 'smtp.gmail.com',
//     service: "gmail",
//     // port: 465,
//     // secure: true,
//     auth: {
//         type: 'OAuth2',
//         user,
//         // pass,
//         clientId,
//         clientSecret,
//         refreshToken,
//         // accessToken
//     }
//   // service: "Gmail",
//   // auth: {
//   //   user: user,
//   //   pass: pass,
//   // },
// });

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'nickolas.goodwin@ethereal.email',
      pass: 'z528UuSgsAMz8yhvtD'
  }
};


const sendConfirmationEmail = async (name, email, confirmationCode) => {

  // const user = process.env.USER;
  // // const pass = process.env.PASS;
  // const CLIENT_ID = process.env.CLIENT_ID;
  // const CLIENT_SECRET = process.env.CLIENT_SECRET;
  // const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  // const REDIRECT_URI = process.env.REDIRECT_URI;
  // // const accessToken = process.env.ACCESS_TOKEN;

  // const OAuth2Client = new google.auth.OAuth2(
  //   CLIENT_ID,
  //   CLIENT_SECRET,
  //   REDIRECT_URI,
  // );

  // OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    // Generate the accessToken on the fly
    // const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport(mailConfig);

    const mailOptions = {
      from: 'no-reply@makecents.com',
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for signing up. Please confirm your email by clicking on the following link</p>
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