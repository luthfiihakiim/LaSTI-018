const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
//const path = require('path'); //Front-end View
const db = require ('../database/config');

router.get('/pegawai', (request, response) => {
  if (request.query.nama !== undefined && request.query.nama.length > 0) {
    db.query("SELECT * FROM capeg WHERE LOWER(nama) LIKE LOWER('%' || $1 || '%') ORDER BY id ASC",[request.query.nama], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else {
    db.query('SELECT * FROM capeg ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
})

router.get('/nilai/:id', (request, response) => {
  const id = parseInt(request.params.id);

  db.query('SELECT * FROM nilai WHERE idcapeg = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    const data = results.rows;
    let output = [];
    data.forEach(row => {
      output[row['idquestion']] = row['score'];
    })
    response.status(200).json(output);
  })
})

router.post('/pegawai', (request, response) => {
  const { nama, alamat, email, no_telepon, tanggal_lahir, category } = request.body;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if(emailRegexp.test(email)){
    db.query('INSERT INTO capeg (nama, alamat, email, no_telepon, tanggal_lahir, category) VALUES ($1, $2, $3, $4, $5, $6)', 
    [nama, alamat, email, no_telepon, tanggal_lahir, category], (error, results) => {
      if (error) {
        throw error
      }

      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
})

router.get('/', (request, response) => {
  response.json({info: 'I LOVE LAYANAN STI'})
})

module.exports = router;