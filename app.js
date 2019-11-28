require('dotenv').config();

var express = require('express');
var app = express();
const cors = require('cors');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
app.use(cors());
app.use('/', require('./router/router'));

//server run
const start = async () => {
  try {
    const server = await app.listen(process.env.PORT || 3000);
    console.info(`Server listening on PORT ${server.address().port}`)
  } catch (err) {
    console.error(err);
  }
};

start();