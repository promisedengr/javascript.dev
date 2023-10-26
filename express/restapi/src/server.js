const express = require('express');
const bodyParser = require('body-parser');
var cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// db connection
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/superhuman', {})
// mongoose.connect('mongodb+srv://admin:%21adminADMIN123@chameleon.3pyh7mu.mongodb.net/test', {})
  .then(() =>  console.log('mongodb is connected'))
  .catch((err) => console.error(err));

// api connection
const apiRoute = require('./route')
app.use('/api/v1', apiRoute)

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`listening on ${port}`);
