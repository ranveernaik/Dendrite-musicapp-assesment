import Navbar from './components/navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Signin from './pages/user/signin'
import Signup from './pages/user/signup'
import Home from './pages/songs/home'

import AddSong from "./pages/songs/addSong"
import MySongs from './pages/songs/mySongs'
import UploadImage from './pages/songs/uploadImage'
import MyPlaylist from './pages/songs/myPlaylist'

import SearchSongs from './pages/songs/searchSongs'
import ForgotPassword from './pages/user/fogotPassword'
import Slidder from './pages/songs/slidder'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
       <Route path='/' element={<Slidder />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
       
        <Route path='/addSong' element={<AddSong />}></Route>
        <Route path='/my-songs' element={<MySongs />}></Route>
        <Route path='/upload-image' element={<UploadImage />}></Route>
        <Route path='/my-playlist' element={<MyPlaylist />}></Route>
        
        <Route path='/forget' element={<ForgotPassword />}></Route>
        <Route path='/search' element={<SearchSongs />}></Route>
      </Routes>

       {/* this container is used to show toast messages */}
       <ToastContainer position='top-right' autoClose={1000} />
    </BrowserRouter>
  )
}


export default App;
