CREATE DATABASE erettsegi
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE erettsegi;

CREATE TABLE vizsgazo(
    id INT PRIMARY KEY,
    diaknev VARCHAR(60),
    evfolyam INT,
    osztaly VARCHAR(1),

    UNIQUE(diaknev, evfolyam, osztaly)
);

CREATE TABLE tanar(
    id VARCHAR(10) PRIMARY KEY,
    nev VARCHAR(60) UNIQUE
);

CREATE TABLE vizsgak(
    id INT PRIMARY KEY,
    bizottsag VARCHAR(10),
    vizsgatargy VARCHAR(30),
    vizsgazoid INT,
    tanarid VARCHAR(10),

    FOREIGN KEY (vizsgazoid) REFERENCES vizsgazo(id),
    FOREIGN KEY (tanarid) REFERENCES tanar(id)
);