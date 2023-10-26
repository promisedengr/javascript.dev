const sql = require("./db.js");

// constructor
const Config = function(item) {
  this.maintenance = item.maintenance; // 0: normal, 1: under maintenance
  this.registration = item.registration; // 0: normal, 1: registration disabled
  this.global = item.global; // 0: normal, 1: registration disabled
  this.sea = item.sea; // 0: normal, 1: registration disabled
  this.paymentwall = item.paymentwall; // 0: normal, 1: registration disabled

};

Config.getAll = (result) => {
    sql.query(`SELECT * FROM configs`, (err, res) => {
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
module.exports = Config;
