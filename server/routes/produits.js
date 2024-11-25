const express = require('express');
const route = express.Router();
const cors = require('cors');
const auth = require('../middlewares/auth');
const fileUpload = require('express-fileupload');
const path = require('path');
route.use(cors());
route.use(fileUpload());
route.use('../uploads', express.static('uploads'));
route.use(express.json());
const connection = require('../db_connection');

route.get('/getAll', auth, (req, res) => {
  var query = connection.query(
    'SELECT p.statue as status, p.id_prod as ref,p.nom,p.img,p.qte,p.prix,f.nom as fournisseur ,p.prix_achat  FROM `produits` as p ,fournisseurs as f WHERE f.id_four=p.id_four',
    function (error, results, fields) {
      if (error) console.log(error);
      res.json({ status: 'ok', data: results });
    }
  );
});

route.get('/getProd/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }
  const id = req.params.id;
  var query = connection.query(
    'SELECT * FROM produits WHERE id_prod = ?',
    [id],
    function (error, results, fields) {
      if (error) console.log(error);

      res.json({ status: 'ok', data: results[0] });
    }
  );
  //
});

route.post('/add', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }
  let { ref, qte, nom, prix, fournisseur, prixAchat } = req.body;
  let img;
  qte = parseInt(qte);
  fournisseur = parseInt(fournisseur);
  prix = parseFloat(prix);
  console.log(prixAchat);
  prixAchat = parseFloat(prixAchat);

  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }

  let uploadedFile = req?.files?.img;
  if (uploadedFile) {
    const newImgName = Math.floor(Math.random() * 100) + uploadedFile.name;
    const uploadPath = path.join(__dirname, '..', 'uploads', newImgName);

    uploadedFile.mv(uploadPath, (err) => {
      if (err) console.log(err);
    });
    img = newImgName;
  } else {
    img = 'defaultImg.png';
  }

  var query = connection.query(
    'INSERT INTO produits values (?,?,?,?,?,?,?,?) ',
    [ref, nom, img, qte, prix, fournisseur, 1, prixAchat],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        return res.json({ status: 'ko', data: 'produit non ajouté' });
      }
      if (results.affectedRows > 0) {
        res.json({ status: 'ok', data: 'produit ajouté avec succés' });
      } else {
        res.json({ status: 'ko', data: 'produit non ajouté' });
      }
    }
  );
});
route.put('/modify/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }
  const id = req.params.id;
  let { qte, nom, prix, prixAchat } = req.body;
  let img;
  prix = parseFloat(prix);
  qte = parseInt(qte);
  prixAchat = parseFloat(prixAchat);
  let uploadedFile = req?.files?.img;
  if (uploadedFile) {
    const newImgName = Math.floor(Math.random() * 100) + uploadedFile.name;
    const uploadPath = path.join(__dirname, '..', 'uploads', newImgName);

    uploadedFile.mv(uploadPath, (err) => {
      if (err) console.log(err);
    });
    img = newImgName;
  }
  if (!img) {
    var values = [nom, qte, prix, prixAchat, id];
    var query1 = `UPDATE produits SET nom = ? , qte=? ,prix=? ,prix_achat=?  WHERE id_prod=?`;
  } else {
    var values = [nom, qte, img, prix, prixAchat, id];
    var query1 = `UPDATE produits SET nom = ? , qte=?,img=? ,prix=?  ,prix_achat=?   WHERE id_prod=?`;
  }
  var query = connection.query(
    query1,
    values,
    function (error, results, fields) {
      if (error) console.log(error);
      if (results.affectedRows > 0) {
        res.json({ status: 'ok', data: 'produit modifié avec succés' });
      } else {
        res.json({ status: 'ko', data: 'modification errone' });
      }
    }
  );
});

route.delete('/delete/:id', auth, (req, res) => {
  const id = req.params.id;
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" });
  }

  var query = connection.query(
    'UPDATE produits SET statue = ? WHERE id_prod =?  ',
    [0, id],
    function (error, results, fields) {
      if (error) console.log(error);

      if (results.affectedRows <= 0) {
        return res.json({ status: 'ko', data: 'produit non trouve' });
      }

      res.json({
        status: 'ok',
        data: 'produit supprier ave succes',
      });
    }
  );
});

module.exports = route;
