const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');



const twilioSms = async (req, res, next) => {
  try {

    // id auton
    const client = require('twilio')(accountSid, authToken);

    const otp = Math.floor(1000 + Math.random() * 9000);

    req.session.otp = otp;

    await client.messages
      .create({
        from: '+12526698244',
        to: '+916356340968',
        body: otp
      })
      .then((message) => next())
  } catch (error) {
    console.log(error);

  }
}

const verifiy = async (req, res, next) => {
  console.log("a", req.session.otp);
  try {
    const session_otp = req.session.otp;
    const otp = req.body;

    console.log(otp);
    

    if (!session_otp == otp) {
      res.status(404).json({
        success: false,
        message: "wrong otp"
      })
    }

    // res.status(200).json({
    //   success: true,
    //   message: "successfull verify"
    // })

    next()

  } catch (error) {
    console.log(error);

  }


}


module.exports = { twilioSms, verifiy } 
