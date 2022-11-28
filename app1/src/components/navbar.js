import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { signout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ()=>{

    // get the current status
    const signinStatus = useSelector((state)=> state.authSlice.status) 

    // get the role status admin or user
    const adminStatus = useSelector((state)=>state.authSlice.statusAdmin)

    // get the dispatcher
    const dispatch = useDispatch()

    // used to navigate
    const navigate = useNavigate()

    const token = sessionStorage['token'];
    // console.log(token)    

    return(
        <nav
        style={{ backgroundColor: '#3FD2C7' }}
        class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
    <Link class="navbar-brand" to="/home"><img></img></Link>
    <Link class="navbar-brand" to="/home">The MusicApp</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
      {signinStatus && (
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/search">Search Songs</Link>
        </li>
        )}
        

        {signinStatus && adminStatus  && (
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/addSong">Add Song</Link>
        </li>
        )}

        {signinStatus && adminStatus && (
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/my-songs">My Added Songs</Link>
        </li>
        )}

        {token && signinStatus && !adminStatus && (
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/my-playlist">My Playlist</Link>
        </li>
        )}

        
        </ul>

        <ul className="navbar-nav navbar-right">
          <li class="nav-item">
            {/* if user is not signed then render signin link */}
            {!token && (
            <Link class="nav-link active" aria-current="page" to="/signin">Sign In</Link>
            )}

            {/* if user is signed in then render signout button */}
            {token && (
              <button
              style={{ textDecoration: 'none', color: 'white' }}
              onClick={() => {
                // go to signin page
                navigate('/')

                // send the action to let the user signout
                dispatch(signout())
              }}
              className='btn btn-link'
              aria-current='page'>
              Signout
            </button>
            )}
          </li>
        </ul>


    </div>
</div>
</nav>
    )
}


export default Navbar;