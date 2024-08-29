const express = require("express");
const userController = require("../../../controller/users.controller");
const passport = require("passport");
const sendMail = require("../../../utilse/nodemailer");
const exportpdfmake = require("../../../utilse/pdfcrate");
const upload = require("../../../middleware/upload");
const { genrentAccRefToken } = require("../../../controller/users.controller");


const router = express.Router();



router.post(
  "/useradd",
  // upload.single("avtar"),
  userController.register
);

router.post(
  "/login",
  userController.login
);
router.post(
  "/get-newtoken",
  userController.generateNewToken
);

router.post(
  "/logout",
  userController.logout
);

router.post(
  "/chekhlogin",
  userController.chekhlogin
)

//http://localhost:5000/api/v1/users/googlelogin
router.get('/googlelogin',
  passport.authenticate('google',
    { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google',
    { failureRedirect: '/login' }),
  async function (req, res) {

    console.log(req.isAuthenticated());
    console.log(req.session);
    console.log("eeeeeeeeeeeeeewewewe", req.user);
    console.log("Successful authentication");


    if (req.isAuthenticated()) {
      const { accrestoken, refretoken } = await genrentAccRefToken(req.user._id);
      console.log("accrestoken!!!!!!!!!!!1", accrestoken);
      console.log("refretoken!!!!!!!!!!!!", refretoken);


      const optionaccrestoken = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000,
      };

      const optionrefretoken = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 24 * 10 * 1000,
      };


      res
        .status(200)
        .cookie("accrestoken", accrestoken, optionaccrestoken)
        .cookie("refretoken", refretoken, optionrefretoken)
        // .redirect("https://fruitables-umber.vercel.app/")
        .redirect("http://localhost:3000/")   
    }
  });

//http://localhost:5000/api/v1/users/facebooklogin
router.get('/facebooklogin',
  passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook',
    { failureRedirect: '/login' }),
  function (req, res) {
    console.log("Successful authentication");
    res.send("okkk");
  });


// router.post('/sendemail', async (req, res) => {
//   const { to, subject, text, html } = req.body;

//   console.log(req.body);

//   try {
//       await sendMail(to, subject, text, html);
//       res.status(200).send('Email sent successfully!');
//   } catch (error) {
//       res.status(500).send('Error sending email');
//   }
// });

router.get(
  '/pdfmake',
  exportpdfmake
)



module.exports = router;
