const express = require('express')
const route = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
route.use(cors())

const connection = require('../db_connection')
route.post('/register', auth, (req, res) => {
  const { nom, tel, mdp, role } = req.body
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  var query = connection.query(
    'INSERT INTO utilisateurs values (?,?,?,?,?,?) ',
    [null, nom, tel, mdp, role, 1],
    function (error, results, fields) {
      if (error) console.log(error)
      res.json({ status: 'ok', data: results })
    }
  )
})
route.post('/login', (req, res) => {
  const { nom, mdp } = req.body

  var query = connection.query(
    'SELECT * FROM utilisateurs WHERE nom=? AND mdp=? AND statue=?  ',
    [nom, mdp, 1],
    function (error, results, fields) {
      if (error) console.log(error)
      if (results.length <= 0) {
        return res.json({ status: 'ko', data: 'nom ou mdp incorrect' })
      }

      var token = jwt.sign(
        {
          nom: results[0].nom,
          idUser: results[0].id_utilisateur,
          role: results[0].role,
        },
        process.env.secret
      )

      res.json({
        status: 'ok',
        data: {
          token,
          role: results[0].role,
          nom: results[0].nom,
        },
      })
    }
  )
})
route.delete('/delete/:id', auth, (req, res) => {
  const id = parseInt(req.params.id)
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }

  var query = connection.query(
    'UPDATE utilisateurs SET statue = ? WHERE id_utilisateur=?  ',
    [0, id],
    function (error, results, fields) {
      if (error) console.log(error)

      if (!results || results?.affectedRows <= 0) {
        return res.json({ status: 'ko', data: 'utilisateur non trouve' })
      }

      res.json({
        status: 'ok',
        data: 'utilisateru supprier ave succes',
      })
    }
  )
})
route.get('/getAll', auth, (req, res) => {
  console.log(req.role)
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  var query = connection.query(
    'SELECT * FROM utilisateurs where statue = 1',
    function (error, results, fields) {
      if (error) console.log(error)
      console.log(results)
      results = results.map((r) => {
        return {
          role: r.role,
          nom: r.nom,
          id: r.id_utilisateur,
          tel: r.tel_u,
          mdp: '',
          status: r.statue,
        }
      })
      res.json({ status: 'ok', data: results })
    }
  )
})
route.get('/getUser/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  const id = parseInt(req.params.id)
  var query = connection.query(
    'SELECT * FROM utilisateurs WHERE id_utilisateur =?',
    [id],
    function (error, results, fields) {
      if (error) console.log(error)

      res.json({ status: 'ok', data: { ...results[0], mdp: '' } })
    }
  )
})

route.put('/modify/:id', auth, (req, res) => {
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  const id = parseInt(req.params.id)
  const { nom, tel, mdp, role } = req.body
  console.log(nom, tel, mdp, role)
  let queryTable = [nom, role, tel]
  let queryString = 'nom = ? , role = ? , tel_u = ? '
  if (mdp) {
    queryString += ' , mdp = ? '
    queryTable.push(mdp)
  }
  queryTable.push(id)

  var query = connection.query(
    'UPDATE utilisateurs SET ' + queryString + ' WHERE id_utilisateur= ?',
    queryTable,
    function (error, results, fields) {
      if (error) console.log(error)

      res.json({ status: 'ok', data: 'utilisateur modifier avec succés' })
    }
  )
})

module.exports = route
