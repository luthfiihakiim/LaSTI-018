CREATE TABLE capeg (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  alamat VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  no_telepon VARCHAR(15) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  category INTEGER NOT NULL
);

INSERT INTO capeg (nama, alamat, email, no_telepon, tanggal_lahir, category)
VALUES ('Agung Podomoro', 'Jalan Podomoro Land no. 10, Sukalurah, Sukacamat, Sukaguber', 'agung@podomoro.com', '089628035162', '1996-12-30', 1),
('Jajang Suhendra', 'Jalan Ganesha no. 10, Siliwangi, Coblong, Bandung', 'hendra@jajang.com', '08112341999', '1990-10-10', 1),
('Ahmad Suhendra', 'Jalan Cikutra no. 10, Dago, Coblong, Bandung', 'hendra@ahmad.com', '089632418897', '1990-04-28', 2),
('Atta Ashiyap', 'Jalan Dago Asri I no. 14, Dago, Pasir Kalili, Cirebon', 'aaaashiyap@atta.com', '082244315531', '1985-08-31', 2);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  testname VARCHAR(255) NOT NULL,
  prereq INTEGER REFERENCES tests(id),
  passing_score INTEGER NOT NULL
);

INSERT INTO tests (id, testname, prereq, passing_score)
VALUES (1, 'Administrasi', NULL, 80), 
(2, 'Kesehatan', 1, 70),
(3, 'Wawancara', 2, 90);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  testid INTEGER NOT NULL REFERENCES tests(id),
  nama VARCHAR(255) NOT NULL,
  maxscore INTEGER NOT NULL,
  minpassscore INTEGER NOT NULL
);

INSERT INTO questions (testid, nama, maxscore, minpassscore)
VALUES (1, 'Pendidikan Formal', '100', '80'), (1, 'Pengalaman Kerja', '100', '80'), (1, 'Pengetahuan Teknis', '100', '80'),
(1, 'Motivasi', '100', '70'), (1, 'Kerja Sama', '100', '60'), (1, 'Etika', '100', '80'), (1, 'Kemampuan Komunikasi', '100', '70'),
(1, 'Kemampuan Bahasa Asing', '100', '50'), (1, 'Penampilan Diri', '100', '80'), (1, 'Kemampuan Memimpin', '100', '80'),
(2, 'Tes Jasmani', '100', '60'), (2, 'Tes Narkoba', '100', '100'), (2, 'Ability Test', '100', '80'),
(2, 'Achievement Test', '100', '80'), (2, 'Personality Test', '100', '80'), 
(3, 'Curriculum Vitae', '100', '100'), (3, 'Ijazah', '100', '100'), (3, 'Sertifikat', '100', '100'),
(3, 'Transkrip', '100', '100'), (3, 'Kartu Keluarga', '100', '100'), (3, 'Surat Lamaran', '100', '100'),
(3, 'Surat Pernyataan', '100', '100');

CREATE TABLE nilai (
  idcapeg INTEGER NOT NULL REFERENCES capeg(id),
  idquestion INTEGER NOT NULL REFERENCES questions(id),
  score INTEGER NOT NULL,
  PRIMARY KEY(idcapeg, idquestion)
);