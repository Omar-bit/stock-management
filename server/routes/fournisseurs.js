const express = require('express')
const route = express.Router()
const cors = require('cors')
const auth = require('../middlewares/auth')
route.use(cors())
const connection = require('../db_connection')

route.get('/getAll', auth, (req, res) => {

  var query = connection.query(
    'SELECT * FROM fournisseurs where statue = 1',
    function (error, results, fields) {
      if (error) console.log(error)
      results = results.map((r) => {
        return {
          pays: r.pays,
          nom: r.nom,
          tel: r.tel_four,
          id: r.id_four,
          status: r.statue,
        }
      })
      res.json({ status: 'ok', data: results })
    }
  )
})

route.get('/getFournisseur/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  const id = parseInt(req.params.id)
  var query = connection.query(
    'SELECT * FROM fournisseurs WHERE id_four = ?',
    [id],
    function (error, results, fields) {
      if (error) console.log(error)

      res.json({ status: 'ok', data: results[0] })
    }
  )
})

route.post('/add', auth, (req, res) => {
  const { nom, tel_four, pays } = req.body
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  var query = connection.query(
    'INSERT INTO fournisseurs values (?,?,?,?,?) ',
    [null, nom, tel_four, pays, 1],
    function (error, results, fields) {
      if (error) console.log(error)
      if (results.affectedRows > 0) {
        res.json({ status: 'ok', data: 'fournisseur ajouté avec succés' })
      } else {
        res.json({ status: 'ko', data: 'fournisseur non ajouté' })
      }
    }
  )
})
route.put('/modify/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  const id = parseInt(req.params.id)
  const { nom, tel_four, pays } = req.body
  let queryTable = [nom, pays, tel_four, id]
  let queryString = 'nom = ? , pays = ? , tel_four = ? '

  var query = connection.query(
    'UPDATE fournisseurs SET ' + queryString + ' WHERE id_four= ?',
    queryTable,
    function (error, results, fields) {
      if (error) console.log(error)

      res.json({ status: 'ok', data: 'fournisseurs modifier avec succés' })
    }
  )
})

route.delete('/delete/:id', auth, (req, res) => {
  const id = parseInt(req.params.id)
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }

  var query = connection.query(
    'UPDATE fournisseurs SET statue=0 WHERE id_four =?  ',
    [id],
    function (error, results, fields) {
      if (error) console.log(error)
      if (!results || results?.affectedRows <= 0) {
        return res.json({ status: 'ko', data: 'fournisseur non trouve' })
      }

      res.json({
        status: 'ok',
        data: 'fournisseur supprier ave succes',
      })
    }
  )
})

module.exports = route
