const sql = require("./db.js");

const Donation = function (donation) {
    this.price = donation.price
    this.coin = donation.coin
    this.img = donation.img
}
Donation.create = (newHistory, result) => {
    sql.query("INSERT INTO item_mall_histories SET ?", newHistory, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newHistory})
    })
}

Donation.getAll = (data, result) => {
    let query = `SELECT * FROM donations`
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      return;
      }
  
      if (res.length) {
  
        result(null, res);
        return;
      }
      result(null, []);
    });
  }
  Donation.getTotalCountByUserId = (data, result) => {
    let query = `SELECT COUNT (*) AS total FROM item_mall_histories WHERE user_id = ${data.user_id} `
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(0, null);
      return;
      }
      result(null, res[0]);
    });
  }
module.exports = Donation;