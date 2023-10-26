const sql = require("./db.js");

// constructor
const Item = function(item) {
  this.name = item.name;
  this.password = item.password;
  this.email = item.email;
  this.phoneNumber = item.phoneNumber
  this.coin = item.coin
  this.netType = item.netType // 0: Global, 1: Sea
};

Item.findItemsOnCategory = (data, result) => {
  console.log(data)
  var offset = (sql.escape(data.currentPage) - 1) * sql.escape(data.perPage)
  let query = `SELECT * FROM items WHERE category_id = ${sql.escape(data.category_id)} `
  // let query = 'SELECT * FROM items WHERE category_id = ' + sql.escape(data.category_id) + ' '

  if (data.searchName) {
    // query = query + `AND name LIKE '%${data.searchName}%' `
    var str = sql.escape(data.searchName)
    var newStr = str.slice(0, 1)+'%'+str.slice(1, str.length -1) + '%' + str.slice(str.length - 1)
    query = query + "AND name LIKE "+ newStr + " "
  }
  if (sql.escape(data.sortType) == 0) {
    query = query + `ORDER BY created_at ASC `
  } else if (sql.escape(data.sortType) == 1) {
    query = query + `ORDER BY count ASC `
  }
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
Item.getTotalCountByCategory = (data, result) => {
  let query = `SELECT COUNT (*) AS total FROM items WHERE category_id = ${sql.escape(data.category_id)} `
  if (data.searchName) {
    // query = query + `AND name LIKE '%${data.searchName}%'`
    var str = sql.escape(data.searchName)
    var newStr = str.slice(0, 1)+'%'+str.slice(1, str.length -1) + '%' + str.slice(str.length - 1)
    query = query + "AND name LIKE "+ newStr + " "
  }

  sql.query(query, (err, res) => {
    // console.log(res)
    if (err) {
      console.log("error: ", err);
      result(0, null);
    return;
    }
    result(null, res[0]);

    // if (res.length) {
    //   return;
    // }
  });
}
Item.findById = (id, result) => {
  // var query = 'SELECT * FROM items WHERE id = ' + sql.escape(id)
  // sql.query(query, (err, res) => {
  sql.query(`SELECT * FROM items WHERE id = ${sql.escape(id)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    console.log("Not Found in users table with the id", id)
    result({ kind: "not_found" }, null);
  });
};


module.exports = Item;
