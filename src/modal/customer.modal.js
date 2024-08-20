const  pool  = require("../db/Sql");

const getcustomers = async (req, res) => {
    try {
        const data = await pool.execute("SELECT * FROM customers")
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getcustomers
};