const { request } = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()


// get all playlist items
router.get('/myplaylist', (request, response) => {
  const statement = `
        SELECT song.songId,songName,image,genre,artist
        FROM song,playlist
        WHERE playlist.songId = song.songId AND playlist.userId = ?
    `
  db.pool.query(statement, [request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


// add a song in playlist
router.post('/:songId', (request, response) => {
  const { songId } = request.params

  const statement = `
        INSERT INTO playlist (songId, userId) VALUES (?, ?)
    `
  db.pool.query(statement, [songId, request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})




// remove a song from playlist
router.delete('/remove/:songId', (request, response) => {
  const { songId } = request.params

  const statement = `
        DELETE FROM playlist 
        WHERE songId = ? AND userId = ?
    `
  db.pool.query(statement, [songId, request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})




module.exports = router

