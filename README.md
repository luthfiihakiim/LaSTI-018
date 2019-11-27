# LaSTI-018

## Setting Database
### Make sure that you have postgres installed on your machine

```sql
CREATE ROLE luhtfiihakiim WITH LOGIN PASSWORD adminadmin;
ALTER ROLE luhtfiihakiim CREATEDB;
CREATE DATABASE employee;
GRANT ALL PRIVILEGES ON DATABASE employee TO luhtfiihakiim;
\q
```

```bash
psql -d employee -U luhtfiihakiim
```

```sql
CREATE TABLE calon_pegawai (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(30),
    alamat VARCHAR(30),
    tglLahir VARCHAR(10),
    templatLhr VARCHAR(20),
    kontak VARCHAR(15), 
    status VARCHAR(10),
    SMA VARCHAR(30) NOT NULL,
    sarjanaI VARCHAR(30),
    sarjanaII VARCHAR(30),
    sarjanaIII VARCHAR(30)
);

INSERT INTO calon_pegawai (nama, alamat, tglLahir, tempatLhr, kontak, status)
  VALUES ('Lala', 'Cisitu Indah', '03-01-1999', 'Bandung', '08112319941', 'Diterima');
```

```sql
CREATE TABLE nilai (
    id SERIAL PRIMARY KEY,
    calon_id INTEGER REFERENCES calon_pegawai(id),
    nilai NUMERIC(5,2) NOT NULL,
    PRIMARY KEY (id)
);
```