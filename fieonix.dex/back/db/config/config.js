const fs = require('fs');
require("dotenv").config();

module.exports = {
  development: {
    username: 'root',
    password: 'dex',
    database: 'fieonix',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
//   test: {
//     username: process.env.test_db_username,
//     password: process.env.test_db_password,
//     database: process.env.test_db_name,
//     host: process.env.local,
//     port: 3306,
//     dialect: 'mysql',
//     dialectOptions: {
//       bigNumberStrings: true
//     }
//   },
//   production: {
//     username: process.env.prod_db_username,
//     password: process.env.prod_db_password,
//     database: process.env.prod_db_name,
//     host: process.env.prod_db_host,
//     port: process.env.prod_db_port,
//     dialect: 'mysql',
//     dialectOptions: {
//       bigNumberStrings: true,
//       // ssl: {
//       //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
//       // }
//     }
//   }
};