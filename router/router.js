const express = require('express');
const router = express.Router();
const path = require('path'); //Front-end View
const db = require ('../database/config');
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



router.get('/pegawai', (request, response) => {
  if (request.query.nama !== undefined && request.query.nama.length > 0) {
    db.query("SELECT * FROM capeg WHERE LOWER(nama) LIKE LOWER('%' || $1 || '%') ORDER BY id ASC",[request.query.nama], (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(200).json(results.rows)
    })
  }
  else {
    db.query('SELECT * FROM capeg ORDER BY id ASC', (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(200).json(results.rows)
    })
  }
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

router.post('/nilai', (request, response) => {
  const { idcapeg, idquestion, score } = request.body;
  db.query('INSERT INTO nilai (idcapeg, idquestion, score) VALUES ($1, $2, $3)', 
    [idcapeg, idquestion, score], error => {
      if (error) {
        response.status(422).json({status: 'failed', message: error})
      } 
      else {
        response.status(201).json({status: 'success', message:'score added'})
      }
    })
})

router.delete('/nilai/:idc/:idq', (request, response) => {
  const idc = parseInt(request.params.idc);
  const idq = parseInt(request.params.idq);

  db.query('UPDATE nilai SET score = 0 WHERE idcapeg = $1 AND idquestion = $2', [idc, idq], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({status: 'success', message:`Employee score with ID: ${idc} removed successfully`})
    })
})

router.put('/nilai', (request, response) => {
  const { idcapeg, idquestion,  score } = request.body;
  db.query('UPDATE nilai SET score = $1 WHERE idcapeg = $2 AND idquestion = $3', [score, idcapeg, idquestion], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Employee score updated to ${score} with ID ${results.insertId}`)
    })
})

router.get('/lulus/:id', (request, response) => {
  const id = parseInt(request.params.id);

  db.query('SELECT capeg.nama, capeg.alamat, capeg.email, capeg.no_telepon, capeg.tanggal_lahir, capeg.category FROM (SELECT idcapeg as idpeg FROM (Select nilai.idcapeg as idcapeg from questions,nilai where questions.id = nilai.idquestion AND nilai.score >= questions.minpassscore AND questions.testid = $1 ) as data group by data.idcapeg having count(data.idcapeg) >= (SELECT COUNT(id) from questions WHERE questions.testid = $2 )) as datafix, capeg WHERE datafix.idpeg = capeg.id;', [id,id], (error, results) => {
    if (error) {
      throw error
    }
    const data = results.rows;
    response.status(200).json(data);
  })
})

router.get('/', (request, response) => {
  response.sendFile(path.join(__dirname+'home.html'));
  response.json({info: 'I LOVE LAYANAN STI'})
})

module.exports = router;