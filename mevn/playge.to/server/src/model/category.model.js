const sql = require("./db.js");

// constructor
const Category = function(item) {
  this.name = item.name;
  this.password = item.password;
  this.email = item.email;
  this.phoneNumber = item.phoneNumber
  this.coin = item.coin
  this.netType = item.netType // 0: Global, 1: Sea
};

Category.getAll = (result) => {
    sql.query(`SELECT * FROM categories`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(0, null); // internal server error
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result(1, null); // no category
    });
}
module.exports = Category;
