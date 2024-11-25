const express = require('express');
const cors = require('cors');
require('dotenv').config();
const utilisateurs = require('./routes/utilisateurs.js');
const fournisseurs = require('./routes/fournisseurs.js');
const produits = require('./routes/produits.js');
const clients = require('./routes/cilents.js');
const ventes = require('./routes/ventes.js');
const stats = require('./routes/stats.js');
const app = express();
const db = require('./db_connection.js');
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/utilisateurs', utilisateurs);
app.use('/api/fournisseurs', fournisseurs);
app.use('/api/clients', clients);
app.use('/api/produits', produits);
app.use('/api/ventes', ventes);
app.use('/api/stats', stats);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('app listening on port 5000!');
});
