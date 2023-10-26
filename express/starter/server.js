const express = require('express');
const app = express();
app.listen(4002, ()=> console.log('listening at 4002'))
app.use(express.static('public'))