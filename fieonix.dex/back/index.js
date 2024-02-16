require("dotenv").config();
const cron = require('node-cron');
const express = require("express");
const app = express();
const cookieParser  = require('cookie-parser')

const router = require("./router")

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    host: process.env.local,
    dialect: 'mysql'
});

var test = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test()

console.log('--  Server Started  --')

const { setBalance } = require('./controller/balance')
cron.schedule("0 */5 * * * *", function() {
    console.log('________________________s')
    setBalance()
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use( cookieParser() )
app.use( express.urlencoded({extended: true}) )
app.use( express.json() )

app.use("/api", router)

//PORT
const port = process.env.port || 4100;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

