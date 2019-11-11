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

router.get('/employee/:id', (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM calon_pegawai WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

router.post('/employee', (request, response) => {
  const { nama, alamat, tglLahir, templatLhr, kontak, status } = request.body;

  db.query('INSERT INTO calon_pegawai (nama, alamat, tglLahir, templatLhr, kontak, status) VALUES ($1, $2, $3, $4, $5, $6)', 
  [nama, alamat, tglLahir, templatLhr, kontak, status], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
})

router.get('/', (request, response) => {
  response.json({info: 'HOMEPAGE LASTI'})
})

module.exports = router;