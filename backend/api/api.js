const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/insertinto', async (request, response) => {
    const body = request.body;

    try {
        const insertinto = await database.insertinto(body.nev, body.ar, body.finom);
        response.status(200).json({
            message: 'Ez a végpont működik',
            insertId: insertinto
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik'
        });
    }
});

router.get('/atlagAr', async (request, response) => {
    try {
        const result = await database.atlagAr();
        response.status(200).json({
            result
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Hiba történt.' });
    }
});

router.get('/kaja/:nev', async (request, response) => {
    const nev = request.params.nev;
    try {
        const result = await database.kajaAdatLekerdezes(nev);
        response.status(200).json({ result });
    } catch (error) {
        console.error(error);
        response.status(200).json({ message: 'Hiba történt.' });
    }
});

/**feladat 01 */
router.get('/categories', async (request, response) => {
    try {
        const result = await database.osszesKategoriaListazasa();
        response.status(200).json({ result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Hipa' });
    }
});

router.post('/categories', async (request, response) => {
    const { name } = request.body;

    if (!name) {
        response.status(400).json({ message: 'huibjás body' });
    }

    try {
        await database.kategoriaHozzaadasa(name);
        response.status(201).json({ message: 'sikeres hozzáadás' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'hiba történt' });
    }
});

router.post('/updatecategories/:id', async (request, response) => {
    const id = request.params.id;
    const name = request.body.name;

    try {
        const result = await database.kategoriaModositas(id, name);

        if (!result) {
            return response.status(500).json({ message: 'Hiba' });
        }

        if (result.affectedRows < 1) {
            return response.status(500).json({ message: 'Nem található id' });
        }

        response.status(200).json({ message: 'Sikeres módosítás' });
    } catch (error) {
        console.error(error);
    }
});

router.post('/deletecategories/:id', async (request, response) => {
    const id = request.params.id;

    try {
        const result = await database.kategoriaTorles(id);

        if (!result) {
            return response.status(500).json({ message: 'Hiba' });
        }

        if (result.affectedRows < 1) {
            return response.status(500).json({ message: 'Nem található id' });
        }

        response.status(200).json({ message: 'Sikeres törlés' });
    } catch (error) {
        console.error(error);
    }
});

// 3. feladat
router.get('/users', async (request, response) => {
    try {
        const result = await database.selectusers();
        response.status(200).json({ result: result });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Hiba!!!' });
    }
});

router.post('/users', async (request, response) => {
    const { name, email } = request.body;

    try {
        const result = await database.adduser(name, email);
        if (!result) {
            response.status(500).json({ messgae: 'Hiba történt' });
        }
        response.status(200).json({ result });
    } catch (error) {
        console.error(error);
    }
});

router.post('/updateusers/:id', async (request, response) => {
    const { name, email } = request.body;

    try {
        await database.updateuser(request.params.id, name, email);
        response.status(200).json({ result: 'Siker' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ messgae: error.message });
    }
});

module.exports = router;
