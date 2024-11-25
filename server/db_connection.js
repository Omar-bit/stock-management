const mysql = require('mysql2');
require('dotenv').config();
//const urlDB ='mysql://root:QOJEnAdduetZX2bTpXlc@containers-us-west-155.railway.app:6133/railway'
const connection = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 15,
  maxIdle: 1000,
  idleTimeout: 30 * 60 * 60 * 1000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  host: process.env.host,
  port: process.env.portdb,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

module.exports = connection;
