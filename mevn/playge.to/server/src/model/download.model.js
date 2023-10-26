const sql = require("./db.js");

const Download = function (download) {
    this.name = download.name
    this.link = download.link
    this.picture = download.picture
    this.size = download.size
}
Download.create = (newHistory, result) => {
    sql.query("INSERT INTO item_mall_histories SET ?", newHistory, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newHistory})
    })
}

Download.getDownloads = (data, result) => {
    let query = `SELECT * FROM downloads`
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
  Download.getTotalCountByUserId = (data, result) => {
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
module.exports = Download;