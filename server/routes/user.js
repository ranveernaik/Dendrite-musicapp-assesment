const express = require('express')
const db = require('../db')
const cryptoJS=require('crypto-js')
const utils = require('../utils')
const config = require('../config')
const jwt=require('jsonwebtoken')


const router = express.Router()

router.post('/signup',(request,response)=>{
    const
    {
        
        firstName ,
        lastName ,
        email ,
        password ,
        phone ,
        role,
        }=request.body

        const encryptedPassword = String(cryptoJS.MD5(password))

        const statement = `INSERT into user ( firstName ,
            lastName ,
            email ,
            password ,
            phone,
            role) values (?,?,?,?,?,?)`

            db.pool.query(statement,
                [  firstName ,
                    lastName ,
                    email ,
                    encryptedPassword ,
                    phone ,
                   role],
                (error,customer)=>{
                    response.send(utils.createResult(error,customer))

                })
    
    })

    /*

 *Everytime for GET we are using userId
 *userId is problem here i.e problem is user knowing userId or someone knows
 *so we want to remove userId from all APIs i.e. the reason we are going to use token
*/

    router.post('/signin',(request,response)=>{
        const{email,password} = request.body

         // encrypt the password
        const encryptedPassword = String(cryptoJS.MD5(password))
    const statement = `
    SELECT 
    id,firstName,lastName,email,role
    FROM user
    WHERE
    email = ? AND password = ? ;`

    db.pool.query(statement,[email,encryptedPassword],(error,users)=>{

        const result = {}
        if(error)
        {
            
            result['status'] = 'error'
            result['error'] = error
        }
        else
        {
            if(users.length==0)
            {
                result['status'] = 'error'
                result['error'] = 'User does not found!!!'
            }
            else
            {
                //successfully logged in
               //authentication is successful means we validate user's email and password 

                const user = users[0]
                const payload = {id : user['id']}
            const token  = jwt.sign(payload,config.secret)

            result['status'] = 'success'
            result['data'] = {
                firstName : `${user['firstName']}`,
                lastName : `${user['lastName']}`,
                email : `${user['email']}`,
                role : `${user['role']}`,
                token,
               

                
              
                }
            }
        }

        response.send(result)
    })



    })

    //used to reset password
    router.put('/reset/:id',(request,response)=>{
        const {id} = request.params;
        const {oldPassword,newPassword} = request.body
        const oldEncryptedPassword = String(cryptoJS.MD5(oldPassword))
        const newEncryptedPassword = String(cryptoJS.MD5(newPassword))
 
        const statement = `
        UPDATE user SET
        password=?
        WHERE id=?
        AND password=?`
        db.pool.query(statement,[newEncryptedPassword,id,oldEncryptedPassword],(error,result)=>{
            if(result.affectedRows === 0)
            {
                response.send(utils.createResult('Please enter correct old password'))
            }
            else{
                response.send(utils.createResult(error,result))
            }
            
        })

    })

    
// used when user forgets the password
router.put('/forget',(request,response)=>{
    const { firstName,lastName,email,password } = request.body;
    const statment = `
    UPDATE user
    SET password = ?
    WHERE 
    firstName=? AND lastName=? AND email=?
    `
 
    
    const newEncryptedPassword = String(cryptoJS.MD5(password))

    db.pool.query(statment,[newEncryptedPassword,firstName,lastName,email],(error,result)=>{
        response.send(utils.createResult(error,result))
    })
})



//get currently logged in users details
router.get('/getuserdetails',(request,response)=>{
    const statement = `SELECT firstName,lastName from user
    WHERE id = ?`

    db.pool.query(statement,[request.userId],(error,result)=>{
        response.send(utils.createResult(error,result))
    })


})




module.exports = router
