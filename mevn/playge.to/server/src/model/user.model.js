const sql = require("./db.js");

// constructor
const User = function(user) {
  this.name = user.name;
  this.password = user.password;
  this.user_ip = user.user_ip;
  this.email = user.email;
  this.phoneNumber = user.phoneNumber
  this.coin = user.coin;
  this.paymentwall = user.paymentwall //  1 : admin_true
  this.netType = user.netType // 0: Global, 1: Sea
};


User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByName = (name, result) => {
  sql.query(`SELECT * FROM users WHERE name = ${sql.escape(name)}`, (err, res) => {
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
User.findByNameAndNetType = (data, result) => {
  sql.query(`SELECT * FROM users WHERE name = ${sql.escape(data.username)} AND netType = ${sql.escape(data.netType)}`, (err, res) => {
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
User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ${sql.escape(email)}`, (err, res) => {
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
User.findByPhoneNumber = (phoneNumber, result) => {
  sql.query(`SELECT * FROM users WHERE phoneNumber = ${sql.escape(phoneNumber)}`, (err, res) => {
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

User.findById = (id, result) => {
  // sql.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
    var query = 'SELECT * FROM users WHERE id = ' + sql.escape(id)
    sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    console.log('The user is not found with the id: ' + id)
    result({ kind: "not_found" }, null);
  });
};

User.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, password = ?, email = ?, phoneNumber = ?, coin = ?, netType = ? WHERE id = ?",
    [user.name, user.password, user.email, user.phoneNumber, user.coin, user.netType, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        console.log("Not Found in users table with the id", id)
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...user });
    }
  );
};
User.findForRecover = (data, result) => {
  sql.query(
    "SELECT * FROM users WHERE name = ? AND email = ? AND phoneNumber = ? AND netType = ?",
    [data.username, data.email, data.phoneNumber, data.netType],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result(null, []);
    }
  )
}

User.getCountByCategory = (type, result) => {
  let query = `SELECT COUNT (*) AS count FROM users WHERE netType = ${sql.escape(type)} `
  // if (data.searchName) {
  //   query = query + `AND name LIKE '%${data.searchName}%'`
  // }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(0, null);
    return;
    }
    result(null, res[0]);
  });
}








User.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = User;
