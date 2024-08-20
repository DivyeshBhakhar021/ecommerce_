const  pool  = require("../db/Sql");

const getsalespeople = async (req, res) => {
    try {
        const [result,field] = await pool.execute("SELECT * FROM salespeople");

        // console.log("data",result);
        return result
    } catch (error) {
        // console.log("modal",error);
      throw new Error("fill to facth salespeople data") 
    }
}

const addsalespeople = async (sname,city,comm) => {
    try {
        const [data] = await pool.execute("INSERT INTO salespeople(sname,city,comm) VALUES(?,?,?)",[sname,city,comm]);

        return {snum:data.insertId,sname,city,comm};
        return data;

    } catch (error) {
        console.log(error);
    }
}

const deleteSalespeople = async (snum) => {
    try {
        const [result] = await pool.execute("DELETE FROM salespeople WHERE snum=?", [snum])
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error in delete salespeople.", error)
    }
}
const updateSalespeole = async (sname, city, comm, snum) => {
    try {
        const [result] = await pool.execute("UPDATE salespeople SET sname=?, city=?, comm=? WHERE snum=?", [sname, city, comm, snum])
        // console.log(result);
        return {sname, city, comm, snum};
    } catch (error) {
        console.log(error);
        throw new Error("Error in update salespeople.", error)
    }
}

module.exports = {
    getsalespeople,
    addsalespeople,
    deleteSalespeople,
    updateSalespeole
};