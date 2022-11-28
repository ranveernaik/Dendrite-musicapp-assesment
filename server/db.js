const mysql = require('mysql')
const mysql2= require('mysql2/promise')
const pool = mysql.createPool({
    connectionLimit:20,
    user:'root',
    password:'root',
    database:'musicapp_db',
    port:3306,
    host:'localhost',
})

const poolAsync = mysql2.createPool({
    connectionLimit: 20,
    user: 'root',
    password: 'root',
    database: 'musicapp_db',
    port: 3306,
    host: 'localhost',
  })
  
module.exports = {
    pool,
    poolAsync,
}