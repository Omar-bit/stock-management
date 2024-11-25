const express = require('express');
const route = express.Router();
const cors = require('cors');
const auth = require('../middlewares/auth');
route.use(cors());
const connection = require('../db_connection');

route.get('/getAll', auth, (req, res) => {
  var query = connection.query(
    `SELECT c.id_client, c.nom, c.tel_client, c.statue, 
       COALESCE(SUM(v.prix_tot - ((v.prix_tot/100) * v.remise)), 0) AS total, 
       COALESCE(SUM(v.prix_donnee), 0) AS donnee
FROM clients c
LEFT JOIN ventes v ON c.id_client = v.id_client
WHERE c.statue = 1
GROUP BY c.id_client, c.nom, c.tel_client, c.statue;
`,


    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      results = results.map((r) => ({
        id: r.id_client,
        nom: r.nom,
        tel: r.tel_client,
        status: r.statue,
        total: r.total,
        donnee: r.donnee,
      }));
      res.json({ status: 'ok', data: results });
    }
  );
});

route.get('/getClient/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }
  const id = parseInt(req.params.id);
  var query = connection.query(
    'SELECT * FROM clients WHERE id_client = ?',
    [id],
    function (error, results, fields) {
      if (error) console.log(error);

      res.json({ status: 'ok', data: results[0] });
    }
  );
});

route.post('/add', auth, (req, res) => {
  const { nom, tel } = req.body;
  if (req.role !== 'admin' && req.role !== 'vendeur') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }
  var query = connection.query(
    'INSERT INTO clients values (?,?,?,?) ',
    [null, nom, tel, 1],
    function (error, results, fields) {
      if (error) console.log(error);
      if (results.affectedRows > 0) {
        res.json({ status: 'ok', data: 'client ajouté avec succés' });
      } else {
        res.json({ status: 'ko', data: 'client non ajouté' });
      }
    }
  );
});
route.put('/modify/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }
  const id = parseInt(req.params.id);
  const { nom, tel } = req.body;

  var query = connection.query(
    'UPDATE clients SET nom = ? ,  tel_client = ? WHERE id_client= ?',
    [nom, tel, id],
    function (error, results, fields) {
      if (error) console.log(error);
      if (results?.affectedRows > 0) {
        res.json({ status: 'ok', data: 'client modifié avec succés' });
      } else {
        res.json({ status: 'ko', data: 'modification errone' });
      }
    }
  );
});

route.delete('/delete/:id', auth, (req, res) => {
  const id = parseInt(req.params.id);
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }

  var query = connection.query(
    'UPDATE clients SET statue = ? WHERE id_client =?  ',
    [0, id],
    function (error, results, fields) {
      if (error) console.log(error);

      if (results.affectedRows <= 0) {
        return res.json({ status: 'ko', data: 'clients non trouve' });
      }

      res.json({
        status: 'ok',
        data: 'clients supprier ave succes',
      });
    }
  );
});

module.exports = route;
