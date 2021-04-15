const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service: "gmail",
    auth: {
      user: "kabirenger@gmail.com",
      pass: "rashid3334",
    },
    // auth: {
    //   user: process.env.SMTP_EMAIL,
    //   pass: process.env.SMTP_PASSWORD,
    // },
  });
  // send mail with defined transport object
  const message = {
    from: `kabirenger@gmail.com`,
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.html,
  };
  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};
module.exports = sendEmail;
