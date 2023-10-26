const sql = require("./db.js");
const Transaction = function (transaction) {
    this.username = transaction.username
    this.type = transaction.type
    this.date = transaction.date
    this.state = transaction.state // 0: nothing 1: important 2: event
    this.ref = transaction.ref
    this.coin = transaction.coin

}
Transaction.create = (newTransaction, result) => {
    sql.query("INSERT INTO transactions SET ?", newTransaction, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newTransaction})
    })
}
Transaction.findByUsername = (name, result) => {
    sql.query(`SELECT * FROM transactions WHERE username = ${sql.escape(name)}`, (err, res) => {
      if (err) {
        console.log(err)
        result(0, null); // error in server
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
      result(1, null);
    });
  }
module.exports = Transaction;