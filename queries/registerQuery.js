const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Remplacez par votre utilisateur MySQL
  password: '',  // Remplacez par votre mot de passe MySQL
  database: 'visuellepro1' // Remplacez par le nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

const registerUser = (nom, email, mot_de_passe, role) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Utilisateur WHERE email = ?', [email], (err, results) => {
      if (err) return reject(new Error('Erreur du serveur'));
      if (results.length > 0) return reject(new Error('L\'email est déjà utilisé.'));

      bcrypt.hash(mot_de_passe, 10, (err, hash) => {
        if (err) return reject(new Error('Erreur lors du hachage du mot de passe'));

        db.query('INSERT INTO Utilisateur (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)', 
          [nom, email, hash, role], (err, result) => {
          if (err) return reject(new Error('Erreur lors de l\'insertion de l\'utilisateur'));

          const utilisateurId = result.insertId;

          if (role === 'client') {
            db.query('INSERT INTO Client (utilisateur_id, adresse, telephone) VALUES (?, "", "")', [utilisateurId]);
          } else if (role === 'proprietaire_de_vehicule') {
            db.query('INSERT INTO VehicleOwner (utilisateur_id, entreprise, adresse, telephone) VALUES (?, "", "", "")', [utilisateurId]);
          } else if (role === 'gestionnaire') {
            db.query('INSERT INTO Manager (utilisateur_id, departement) VALUES (?, "")', [utilisateurId]);
          }

          resolve();
        });
      });
    });
  });
};

module.exports = { registerUser };
