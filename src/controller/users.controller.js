const Users = require("../modal/users.modal");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const genrentAccRefToken = async (id) => {
    try {
      const user = await Users.findById(id);
      const accrestoken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.ACCRESTOKEN_RES,
        { expiresIn: 60 * 60 }
      );
  
      const refretoken = jwt.sign({ _id: user._id }, process.env.REFRESTOKEN_RES, {
        expiresIn: "1d",
      });

      
      
  
      user.refretoken = refretoken;
      await user.save({ validateBeforeSave: false });
      return { accrestoken, refretoken };
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const register = async (req, res) => {
    
    try {
      // console.log(req.file);
      
      const { email, password } = req.body;
      const verifyEmail = await Users.findOne({ email });
  
  
  
      if (verifyEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }
  
      const hashPass = await bcrypt.hash(password, 10);
  
      const user = await Users.create({
        ...req.body,
        password: hashPass,
        // avtar: req.file.path,
      });
  
      if (!user) {
        return res.status(500).json({
          success: false,
          message: "User not created.",
        });
      }
  
      const userdataF = await Users.findById(user._id).select("-password");
  
      // sendMail(req.body)
  
      return res.status(201).json({
        success: true,
        message: "Registration successful.",
        data: userdataF,
      });
  
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
      });
    }
  };
  
  const login = async (req, res) => {
    // console.log(req);
    
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) {
        return res.status(404).json({
          success: false,
          message: "Password is incorrect.",
        });
      }
  
      const { accrestoken, refretoken } = await genrentAccRefToken(user._id);
      console.log("accrestoken!!!!!!!!!!!1", accrestoken);
      console.log("refretoken!!!!!!!!!!!!", refretoken);
  
      const userdataF = await Users.findById(user._id).select(
        "-password -refretoken"
      );
  
      const optionaccrestoken = {
        httpOnly: true,
        secure: true,
        maxAge:  60 * 60 * 1000,
      };
  
      const optionrefretoken = {
        httpOnly: true,
        secure: true,
        maxAge:  60 * 60 * 24 * 10 * 1000,
      };
  

      res
        .status(200)
        .cookie("accrestoken", accrestoken, optionaccrestoken)
        .cookie("refretoken", refretoken, optionrefretoken)
        .json({
          success: true,
          message: "Successfully logged in.",
          data: { ...userdataF.toObject(), accrestoken: accrestoken },
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
      });
    }
  };
  
  const generateNewToken = async (req, res) => {
    try {
      const checkToken = jwt.verify(req.cookies.refretoken, "Qwerty12345");
  
      console.log(checkToken);
  
      if (!checkToken) {
        return res.status(400).json({
          success: false,
          message: "Token expired.",
        });
      }
  
      const user = await Users.findById(checkToken._id);
  
      // console.log(user);
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid token.",
        });
      }
  
      if (req.cookies.refretoken !== user.refretoken) {
        return res.status(400).json({
          success: false,
          message: "Invalid refresh token.",
        });
      }
  
      const { accrestoken, refretoken } = await genrentAccRefToken(user._id);
      const option = {
        httpOnly: true,
        secure: true,
      };
  
      res
        .status(200)
        .cookie("accrestoken", accrestoken, option)
        .cookie("refretoken", refretoken, option)
        .json({
          success: true,
          message: "New token generated.",
          data: { accrestoken: accrestoken },
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
      });
    }
  };
  
  const logout = async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(req.body._id, {
        $unset: { refretoken: 1 },
      }, { new: true });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not logged out.",
        });
      }
  
      res
        .status(200)
        .clearCookie("accrestoken")
        .clearCookie("refretoken")
        .json({
          success: true,
          message: "User logged out successfully.",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
      });
    }
  };

  const chekhlogin = async (req,res) => {
   try {
    
    console.log("aaaaaaaaa",req.cookies.accrestoken);
    
    if (!req.cookies.accrestoken) {
      return res.status(401).json({
        success: false,
        message: "Token Invalied",
      });
    }

    const chek = await jwt.verify(req.cookies.accrestoken,"Qwerty123");

    console.log("chek",chek);
    
    if (!chek) {
      return res.status(400).json({
        success: false,
        message: "Token Invalied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Authenticated",
      data: chek
  })
   
    
   } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
    
   }
  }

module.exports = { logout,register,genrentAccRefToken, login, generateNewToken,chekhlogin }