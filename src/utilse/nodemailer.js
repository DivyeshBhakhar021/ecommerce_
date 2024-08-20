const nodemailer = require("nodemailer");
const path = require("path");
// const exportpdfmake = require("./pdfcrate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'divyeshbhakhar021@gmail.com',
    pass: 'ijnj qqmw uotm suxv'
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendMail = async (to, subject, text, html) => {
  // try {
  //   const info = await transporter.sendMail({
  //     from: '"Your Name" <divyeshbhakhar021@gmail.com>',
  //     to:"divyeshbhakhar021@gmail.com",
  //     subject:"abc",
  //     text:"helllo",
  //     attachments: [
  //       {
  //           filename: 'Beets.jpeg',
  //           path: path.join(__dirname,'../../public/assets/Beets.jpeg')
  //       },
  //       {
  //                 filename: 'pdf',
  //                 path: path.join(__dirname,'../../../../../divyesh/project/ecommerce/document.pdf')

  //       },
  //       // exportpdfmake()
  //   ]
  //   });
  //   console.log("Message sent: %s", info.messageId);
  // } catch (error) {
  //   console.error("Error sending email: ", error);
  // }
};

module.exports = sendMail;

