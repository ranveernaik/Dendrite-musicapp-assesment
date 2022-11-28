import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from './../../config';


const ForgotPassword = () =>{

        //get user inputs
        const [firstName,setFirstName] = useState('')
        const [lastName,setLastName] = useState('')
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [confirmPassword,setconfirmPassword] = useState('')

        const navigate = useNavigate();

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password)



        const changePass  = () =>{
            // check if user has really entered any value
            if(firstName.length === 0)
            {
                toast.error('Please enter first name')
            }else if(lastName.length === 0)
            {
                toast.error('Please enter last name')
            }else if(email.length === 0)
            {
                toast.error('Please enter email')
            }
            else if(password.length === 0)
            {
                toast.error('Please enter password')
            }else if(confirmPassword.length === 0)
            {
                toast.error('Please enter confirm password')
            }else if(password !== confirmPassword)
            {
                toast.error('Password does not match')
            }else{
                // make the API call to check if user exists
                axios.put(config.serverURL + '/user/forget',{
                    firstName,
                    lastName,
                    email,
                    password,
                }).then((response)=>{
                    //get the data returned by server
                    const result = response.data
    
                    //check if the user's authentication is successfull
                    if(result['status'] === 'error'){
                        toast.error('Invalid email or firstname')
                    }else{
                        toast.success('Succesfully Changed your Password')
    
                        //navigate to signin page
                        navigate('/signin')
                    }
                })
                    
                
            }
    
            
            
        }
    
    
    return (
        <div style={{marginTop:100}}>
            <h3 style={styles.h3}>Change Password</h3>
             <div style={styles.container}>
                 <div className="mb-3">
                     <label>First Name</label>
                     <input
                     onChange={(event)=>{
                         setFirstName(event.target.value)
                     }}
                     className='form-control'
                     type='text'></input>
                 </div>
 
                 <div className="mb-3">
                     <label>Last Name</label>
                     <input
                     onChange={(event)=>{
                         setLastName(event.target.value)
                     }}
                     className='form-control'
                     type='text'></input>
                 </div>
 
                 <div className="mb-3">
                     <label>Email</label>
                     <input
                      onChange={(event)=>{
                         setEmail(event.target.value)
                     }}
                     className='form-control'
                     type='text'></input>
                 </div>
 
                 <div className="mb-3">
                     <label>Password</label>
                     <input
                      onChange={(event)=>{
                         setPassword(event.target.value)
                     }}
                     className='form-control'
                     type='text'></input>
                 </div>
 
                 <div className="mb-3">
                     <label>Confirm Password</label>
                     <input
                      onChange={(event)=>{
                         setconfirmPassword(event.target.value)
                     }}
                     className='form-control'
                     type='text'></input>
                 </div>

                   
                 <div className='mb-3' style={{ marginTop: 20}}>
                     
                     <button  onClick={()=>{changePass()}} style={styles.signupButton}>
                         Change Password
                     </button>
                 </div>
             </div>
        </div>
     )
 }
 const styles = {
   container: {
     width: 400,
     height: 500,
     padding: 20,
     marginBottom:100,
     position: 'relative',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     margin: 'auto',
     borderColor: '#3FD2C7',
     borderRadius: 10,
     broderWidth: 1,
     borderStyle: 'solid',
     boxShadow: '1px 1px 20px 5px #C9C9C9',
   },
   signupButton: {
     position: 'relative',
     width: '100%',
     height: 40,
     backgroundColor: '#3FD2C7',
     color: 'white',
     borderRadius: 5,
     border: 'none',
     marginTop: 10,
     marginBottom:20,
     
   },
   h3: {
    marginTop:0,
    marginBottom:20,
    textAlign:'center',
}
}


export default ForgotPassword;