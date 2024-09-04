require('dotenv').config(); // Load environment variables
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const registerRoute = require('./routes/register');

const app = express();
const port = process.env.PORT || 5000; 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// lancer wampserver et remplir les informations
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySql :', err);
        return;
    }
    console.log('Connected to MySQL')
});


// app.get("/", (req, res) => {
//     res.send("Hello world!")
// })
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.get('/', (req, res) => {
    res.send('Backend en cours d\'exécution!');
});

app.use('/api/register', registerRoute);

app.listen(port, () => {
    console.log(`serveur démarrer avec succès au port ${port}`);
})


