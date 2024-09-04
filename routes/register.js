const express = require('express');
const { registerUser } = require('../queries/registerQuery');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    const result = await registerUser(nom, email, mot_de_passe, role);
    res.json({ success: true, message: 'Inscription réussie!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
