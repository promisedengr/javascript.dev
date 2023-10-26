const sql = require("./db.js");

// constructor
const Code = function(code) {
    this.sender = code.sender;
    this.code = code.code;
    this.date = code.date;

};


Code.create = (code, result) => {
  sql.query("INSERT INTO codes SET ?", code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...code });
  });
};
Code.findBySender = (sender, result) => {
  sql.query(`SELECT * FROM codes WHERE sender = ${sql.escape(sender)} ORDER BY date DESC`, (err, res) => {
    if (err) {
      console.log(err)
      result(0, null); // error in server
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(1, null);
  });
}
module.exports = Code;

