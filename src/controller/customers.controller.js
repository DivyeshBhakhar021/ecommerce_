const {  getcustomers } = require("../modal/customer.modal");



const listcustomers = async (req, res) => {
    try {
      const customers = await getcustomers();
  
      // console.log(customers);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error " + error.message
      });
    }
  }


module.exports = { listcustomers };


