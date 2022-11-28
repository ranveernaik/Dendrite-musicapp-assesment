import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import config from '../../config'
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Signup = ()=>{

    //get user inputs
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')

  // this function is used to navigate from one component to another programmatically
  // userNavigate() returns a function reference
  const navigate = useNavigate()

  const signup = () =>{
       // check if user has really entered any value
    if (firstName.length === 0) 
    {
        toast.error('Please enter first name')
    }
    else if(lastName.length === 0) 
    {
        toast.error('Please enter last name')
    }
    else if(email.length === 0) 
    {
        toast.error('Please enter email')
    }
    else if(password.length === 0) 
    {
        toast.error('Please enter password')
    }
    else if(confirmPassword.length === 0) 
    {
        toast.error('Please enter password again')
    }
    else if(password !== confirmPassword) 
    {
        toast.error('Password does not match!!!')
    }
    else if(phone.length === 0) 
    {
        toast.error('Please enter phone again')
    }
    else if(role.length === 0) 
    {
        toast.error('Please enter role again')
    }
    else
    {

         // make the API call to check if user exists
      axios
      .post(config.serverURL + '/user/signup',{
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
      })
      .then((response) => {
        // get the data returned by server
        const result = response.data

        // check if user's authentication is successfull
        if (result['status'] === 'error') {
          toast.error('Invalid Email or Password!!!')
        } else {
          toast.success('Successfully Registered a New User')

          // navigate to the singin page
          navigate('/signin')
        }
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
      })
    }

  }
    return (
       <div style={{marginTop:100}}>
            <div style={styles.container}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input
                    onChange={(event)=>{
                        //console.log(event)
                        setFirstName(event.target.value)
                    }}
                    className='form-control'
                    type='text'></input>
                </div>

                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                    onChange={(event)=>{
                        //console.log(event)
                        setLastName(event.target.value)
                    }}
                    className='form-control'
                    type='text'></input>
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                    onChange={(event)=>{
                        //console.log(event)
                        setEmail(event.target.value)
                    }}
                    className='form-control'
                    type='email'></input>
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                    onChange={(event)=>{
                        //console.log(event)
                        setPassword(event.target.value)
                    }}
                    className='form-control'
                    type='password'></input>
                </div>

                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                    onChange={(event)=>{
                        //console.log(event)
                        setConfirmPassword(event.target.value)
                    }}
                    className='form-control'
                    type='password'></input>
                </div>

                <div className="mb-3">
                    <label>Phone</label>
                    <input
                     onChange={(event)=>{
                        //console.log(event)
                        setPhone(event.target.value)
                    }}
                    className='form-control'
                    type='tel'></input>
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <input
                    placeholder = "Admin/Customer"
                     onChange={(event)=>{
                        //console.log(event)
                        setRole(event.target.value)
                    }}
                    className='form-control'
                    type='text'></input>
                </div>
                    <div style={{ marginTop: 30 }}>
                        Already have an account? <Link to='/signin'>Signin here</Link>
                    </div>
                <div className='mb-3' style={{ marginTop: 20}}>
                    
                    <button onClick={signup} style={styles.signupButton}>
                        Signup
                    </button>
                </div>
            </div>
       </div>
    )
}
const styles = {
  container: {
    width: 400,
    height: 620,
    padding: 20,
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
    marginBottom:70,
    
  },
}
export default Signup
