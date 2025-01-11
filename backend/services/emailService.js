import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "airmonitoringbrr@gmail.com",
    pass: "gewe iwwi puks hgwn",
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "bagasramadhan239@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

export default sendEmail;
