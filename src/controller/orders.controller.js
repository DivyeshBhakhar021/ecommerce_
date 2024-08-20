const { getorders } = require("../modal/orders.modal");


const listorders = async (req, res) => {
    try {
      const orders = await getorders();
  
      // console.log(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error " + error.message
      });
    }
  }


module.exports = { listorders };


