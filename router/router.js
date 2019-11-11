const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
//const path = require('path'); //Front-end View
const db = require ('../database/config');

router.get('/employee', (request, response) => {
  db.query('SELECT * FROM calon_pegawai ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

router.get('/', (request, response) => {
  response.json({info: 'HOMEPAGE LASTI'})
})

module.exports = router;