const express = require('express');
const app = express();
app.listen(4001, ()=> console.log('listening at 4001'))
app.use(express.static('public'))