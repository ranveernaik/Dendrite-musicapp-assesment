const express = require('express')
const db = require('../db')
const utils = require('../utils')

// import multer
const multer = require('multer')

// define the location where the files will get uplaoded
const upload = multer({ dest: 'uploads' })
const router = express.Router()

//used for creating a new song
router.post('/addSong',(request,response)=>{
    const {
        songName,
        artist,
        genre,
       
       


    } = request.body

    const statement = `
    INSERT INTO song
    (songName,artist,genre,userId)
        VALUES (?, ?, ? , ?)`

      const values = [
        songName,
        artist,
        genre,
        request.userId,

      ]  

      db.pool.query(statement,values,(error,result)=>{
       
            response.send(utils.createResult(error,result))
    
      
    })

})

  //upload image
  router.post(
    '/upload-image/:id',
    upload.single('photo'),
    (request, response) => {
      const { id } = request.params
  
      // request.file is added by multer
      const filename = request.file.filename
  
      // update the song with the image
      const statement = `
        UPDATE song
        SET image = ?
        WHERE songId = ?
      `
  
      db.pool.query(statement, [filename, id], (error, result) => {
        response.send(utils.createResult(error, result))
      })
    }
  )
  


//used get details of  all songs
router.get('/',(request,response)=>{
    const statement = `
    SELECT songId,songName,artist,genre,image
    FROM song`

    db.pool.query(statement,(error,result)=>{
        response.send(utils.createResult(error,result))
    })

})

// get my songs
router.get('/my',(request,response) => {
    const statement = `SELECT songId,songName,artist,genre
    from song
    WHERE userId = ?`

    db.pool.query(statement,[request.userId],(error,result)=>{
        response.send(utils.createResult(error,result))
    })
})



//used to update song

router.put('/update/:id',(request,response)=>{
    const { id } = request.params;
    const {
        songName,
        artist,
        genre,
       
    } = request.body;


    const statement = `
    UPDATE song SET
        songName=?,
        artist=?,
        genre=?
       

        WHERE songId=?`

    
            const values = [
                songName,
                artist,
                genre,
                id,
            ]
        


        db.pool.query(statement,values,(error,books)=>{
        response.send(utils.createResult(error,books))
        })
})


       


  
//delete a song
router.delete('/delete/:id',(request,response)=>{
    const { id } = request.params
   
    const statement = `
    DELETE from song 
    WHERE 
    songId = ? AND userId = ?`

    db.pool.query(statement,[id,request.userId],(error,songs)=>{
       
            
            response.send(utils.createResult(error,songs))
        
     
    })
})

//used to search a particular song by name
router.get('/search/:text',async (request,response)=>{
    const { text } = request.params
    const statement = `SELECT songId,songName,artist,genre,image
    FROM song 
    WHERE songName like '%${text}%' `

    //wait till the promise is over
    const [result]  = await db.poolAsync.execute(statement)
    response.send(utils.createSuccess(result))
})

//used to get all the songs in the playlist
router.get('/playlist', async (request,response)=>{
    const statement=`
    SELECT songId, songName,artist,image
    FROM song`

    //wait till the promise is over
    const [result] = await db.poolAsync.execute(statement)
    const songs = []

    //iterate the song one by one
    for (const song of result)
    {
        //create a new copy of song
        const newSong = { ...song }

        //for every song check if the song is in the current user's playlist
        const statementPlaylist = `
        SELECT count(*) as count
        FROM playlist
        WHERE songId = ? AND userId = ?`
        
        // wait for every song's playlist status
        const [playlistResult] = await db.poolAsync.execute(statementPlaylist, [
            song.songId,
            request.userId,
        ])

        // get the playlist status
        newSong.playlistStatus =  playlistResult[0].count === 0 ? false : true

        // add the copy to the collection
        songs.push(newSong);
    }

    // return the songs collection to the client
    response.send(utils.createSuccess(songs))
})



module.exports = router