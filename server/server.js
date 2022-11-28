const express = require('express')
const cors = require('cors')
const jwt=require('jsonwebtoken')
const utils=require('./utils')
const config = require('./config')
const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('uploads'))

//middleware to extract the token
app.use( (request,response,next)=>{

    //get the token 
    const token = request.headers['token']
   
   
    // check if token is required in the api
    // token is not needed in following apis
    // - signin, signup, reset-password, forgot-password
    if ( (request.url === '/user/signup') || (request.url === '/user/signin') || (request.url === '/user/forget')  
    || (request.url == '/song/') || (request.url == '/song/search/:text')) 
    {
      // simply call the next function
      // skip checking the token
      next()
    }
    else
    {
    //(if the token is missing) 
    //check if the token is nonempty
    //if((token is not valid) || (token's length is empty) which means client has not send the token
    if(!token || token.length == 0)
    {  //token is empty/ undefined / null
        response.send(utils.createResult('missing token'))

    }
    else
    {
        //token is non-empty

        try{
         //now we are going for decoding means I want to extract information from token
         //extract the payload (information) from token
      const payload = jwt.verify(token, config.secret)
     //extract the userId from the token received
    //and add the userId to the request objct
    //and same request object will be carry forwarded to next one (next()) here
    request.userId = payload.id
   

   
     //(whatever you want to pass to other functions you can put them inside request object)
    //call the real function
    //when the next function gets called,it will receive the same request object which has custId in it
    //(which means whatever you want to pass to other functions you can put them inside request object)

    next()
        }catch (ex) {
            // invalid token or tamperred token
            response.send(utils.createResult('invalid token'))
          }

    }
}
    
   
})

const userRouter = require('./routes/user')
const playlistRouter = require('./routes/playlist')
const songRouter = require('./routes/song')


app.use('/user',userRouter)
app.use('/playlist',playlistRouter)
app.use('/song',songRouter)




app.listen(4000,'0.0.0.0',()=>{
    console.log('server started on port 4000')
})
