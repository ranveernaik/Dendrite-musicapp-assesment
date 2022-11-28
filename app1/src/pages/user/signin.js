import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import config from '../../config'
import axios from "axios"
import { useNavigate } from "react-router-dom"

// use the dispatch to update the redux store about the signin state
import { useDispatch } from 'react-redux'
import { signin,isAdmin } from '../../slices/authSlice'



const Signin = () => {

    // get user inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the dispatcher
  const dispatch = useDispatch()

  // get the navigate function reference
  const navigate = useNavigate()

  const signinUser = () => {
    // check if user has really entered any value
    if (email.length === 0) {
      toast.error('Please enter email')
    } else if (password.length === 0) {
      toast.error('Please enter password')
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + '/user/signin', {
          email,
          password,
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data

          // check if user's authentication is successfull
          if (result['status'] === 'error') {
            toast.error('Invalid Email or Password!!!')
          } else {

            /*
            // localStorage
            // - built-in javascript object
            // - used to store something (key-value pairs)
            // - will NOT be cleared untill the keys get removed explicitly

            // sessionStorage
            // - built-in javascript object
            // - used to store something (key-value pairs)
            // - will be cleared automatically after the session gets killed

            // get the token from response and save it in sessionStorage
            // const token = result.data.token
            sessionStorage['token'] = result['data']['token']
            sessionStorage['username'] = result['data']['name']
            */
            

            // get the logged in user's info
           const user = result['data']

           //send the action 
          dispatch(signin(user))

          var role = result.data.role.toLowerCase();
            console.log(role)
            dispatch(isAdmin(role))

            toast.success('welcome to The MusicApp')
            navigate('/home')
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
                    <label>Email</label>
                    <input
                    onChange={(event) => {
                        setEmail(event.target.value)
                      }}
                    className="form-control" 
                    type='email'></input>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                    onChange={(event) => {
                        setPassword(event.target.value)
                      }}
                    className="form-control" 
                    type='password'></input>
                </div>
                <div className="mb-3">
                    <div>
                        Don't have an account? <Link to='/signup'>Signup here</Link>
                    </div>
                    <div>
                        Forgot Password? <Link to='/forget'>forgot Password</Link>
                    </div>
                    <button onClick={signinUser} style={styles.signinButton}>
                        Signin
                    </button>
                </div>
            </div>
        </div>
       
    )
}


const styles = 
{
    container: {
      width: 400,
      height: 300,
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
    signinButton: {
      position: 'relative',
      width: '100%',
      height: 40,
      backgroundColor: '#3FD2C7',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
    },
}

export default Signin
