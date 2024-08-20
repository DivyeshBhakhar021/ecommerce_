const  pool  = require("../db/Sql");

const getorders = async (req, res) => {
    try {
        const data = await pool.execute("SELECT * FROM orders")
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getorders
};