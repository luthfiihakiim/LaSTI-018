require('dotenv').config();

var express = require('express');
var app = express();

//Router Init
app.use('/', require('./router/router'));

/*
//side-party
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.user(cors())
*/

//server run
const start = async () => {
  try {
    const server = await app.listen(process.env.PORT);
    console.info(`Server listening on PORT ${server.address().port}`)
  } catch (err) {
    console.error(err);
  }
};

start();