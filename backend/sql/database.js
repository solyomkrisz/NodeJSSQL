const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'exampledb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function insertinto(nev, ar, finom) {
    const query = 'INSERT INTO kaja(nev, ar, finom) VALUES(?, ?, ?);';
    try {
        const [rows] = await pool.execute(query, [nev, ar, finom]);
        return rows.insertId;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Az étel neve vagy finomsága már létezik az adatbázisban.');
        }
        throw error;
    }
}

//*Feladat: Készítsen egy sql lekérdezést, amely megadja az ételek átlag árát. A lekérdezéshez készítsen meghívható végpontot is, emellett API tesztet a REST Client segítségével.
async function atlagAr() {
    const query = 'SELECT AVG(ar) FROM kaja;';
    const [result] = await pool.execute(query);
    return result ?? null;
}

//*Feladat: Készítsen SQL lekérdezést, amely segítségével egy paraméterként kapott név alapján kiírja a kajához tartozó összes adatot. A lekérdezéshez készítsen meghívható végpontot is, emellett API tesztet a REST Client segítségével.
async function kajaAdatLekerdezes(nev) {
    const query = 'SELECT * FROM kaja WHERE nev = ?;';
    const [rows] = await pool.execute(query, [nev]);
    return rows[0] ?? null;
}

// 1. feladat
async function osszesKategoriaListazasa() {
    const query = 'SELECT name FROM categories;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function kategoriaHozzaadasa(name) {
    const query = 'INSERT INTO categories(name) VALUES(?);';
    const [result] = await pool.execute(query, [name]);
    return result;
}

async function kategoriaModositas(id, ujnev) {
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const [result] = await pool.execute(query, [ujnev, id]);
    return result;
}

async function kategoriaTorles(id) {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
}

// 2. feladat
async function selectusers() {
    const query = 'SELECT * FROM users';
    const [rows] = await pool.execute(query);
    return rows;
}

async function adduser(name, email) {
    const query = 'INSERT INTO users(name, email) VALUES(?, ?)';
    const [result] = await pool.execute(query, [name, email]);
    return result;
}

async function updateuser(id, name, email) {
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const [result] = await pool.execute(query, [name, email, id]);
    return result;
}

//!Export
module.exports = {
    selectall,
    kajaAdatLekerdezes,
    atlagAr,
    osszesKategoriaListazasa,
    kategoriaHozzaadasa,
    kategoriaModositas,
    kategoriaTorles,
    selectusers,
    adduser,
    updateuser
};
