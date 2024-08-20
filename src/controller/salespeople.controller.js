const { Salespeople } = require("../modal");


const listsalespeople = async (req, res) => {
  try {
    const salespeople = await Salespeople.getsalespeople();

    console.log("s", salespeople);

    res.status(200).json({
      success: false,
      message: "salespeople fond",
      data: salespeople
    });

  } catch (error) {
    // console.log("aa",error);
    res.status(500).json({
      success: false,
      message: "Internal server error " + error.message
    });
  }
}


const adddatasalespeople = async (req, res) => {
  try {

    const { sname, city, comm } = req.body;

    const salespeople = await Salespeople.addsalespeople(sname, city, comm);
    // console.log(salespeople);

    res.status(201).json({
      success: false,
      message: "salespeople fond",
      data: salespeople
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error " + error.message
    });
  }
}

const deleteSalespeople = async (req, res) => {
  try {
    const { snum } = req.params;
    const salespeople = await Salespeople.deleteSalespeople(snum);
    // console.log(salespeople);

    res.status(200).json({
      success: true,
      data: salespeople,
      message: 'salespeople delete successfully.'
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Internal server error.'
    })
  }
}

const updateSalespeople = async (req, res) => {
  try {
    const { snum } = req.params;
    const { sname, city, comm } = req.body;
    const salespeople = await Salespeople.updateSalespeole(sname, city, comm, parseInt(snum));
    // console.log(salespeople);

    res.status(200).json({
      success: true,
      data: salespeople,
      message: 'Salesperson updated successfully.'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
}

module.exports = {
  listsalespeople, adddatasalespeople,
  deleteSalespeople, updateSalespeople
};


