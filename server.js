const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Votre mot de passe MySQL
    database: 'VisuellePro1' // Remplacez par votre nom de base de données
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Exemple d'endpoint pour récupérer des produits
app.get('/produits', (req, res) => {
    let sql = 'SELECT * FROM Produits';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Lancez le serveur sur le port 5000
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
