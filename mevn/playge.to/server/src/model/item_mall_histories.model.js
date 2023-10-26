const sql = require("./db.js");

const ItemMallHistory = function (history) {
    this.user_id = history.user_id;
    this.server_id = history.server_id;
    this.item_name = history.item_name
    this.item_price = history.item_price;
    this.item_img = history.item_img;
    this.date = history.date;
}
ItemMallHistory.create = (newHistory, result) => {
    sql.query("INSERT INTO item_mall_histories SET ?", newHistory, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newHistory})
    })
}

  ItemMallHistory.getHistoryOnUserId = (data, result) => {
    var offset = (sql.escape(data.currentPage) - 1) * sql.escape(data.perPage)

    let query = `SELECT * FROM item_mall_histories WHERE user_id = ${sql.escape(data.user_id)} `
    sql.query(query + ` LIMIT ${sql.escape(data.perPage)} OFFSET ${offset}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(0, null);
      return;
      }
  
      if (res.length) {
  
        result(null, res);
        return;
      }
      result(1, []);
    });
  }
  ItemMallHistory.getTotalCountByUserId = (data, result) => {
    let query = `SELECT COUNT (*) AS total FROM item_mall_histories WHERE user_id = ${sql.escape(data.user_id)} `
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(0, null);
      return;
      }
      result(null, res[0]);
    });
  }



module.exports = ItemMallHistory;