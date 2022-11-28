import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import config from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const MySongs = () =>{

    const [songs, setSongs] = useState([])

    //hook used to navigate
    const navigate = useNavigate()

    // this hooks is called when the value(s) are changed
  // first param: callback function which will be called
  // second param:
  // - list of values which when changed, the callback function gets called
  // - empty array as a second param means the callback gets calld when the component
  //   get loaded successfully
  useEffect(() => {
    // load all the songs created by the user
    getMySongs()
  }, [])

  const getMySongs = ()=>{
    axios.get(config.serverURL + '/song/my',{
        headers : {token : sessionStorage['token'] },
    }).then((response)=>{
        const result = response.data

        if(result['status'] === 'success')
        {
            console.log(result)
            // set the songs to the state member
            setSongs(result['data'])
        }else{
            toast.error(result['error'])
        }
    })
  }

  // delete a song
  const deleteSong = (id) =>{
    axios.delete(config.serverURL +'/song/delete/' + id,{
        headers: {token : sessionStorage['token'] },
    }).then((response) => {
        const result = response.data
        if(result['status'] === 'success')
        {
            //reload the screen
            getMySongs()
        }
        else{
            toast.error(result['error'])
        }
    })
  }

  
  
   //upload image
   const uploadImage = (id) => {
    //pass the song id for uploading image 
    navigate('/upload-image',{state : {songId : id}})
}
 
    return (
       <div className="container">
            <h3 style={styles.h3}>My Added Songs</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name of Song</th>
                        <th>Artist</th>
                        <th>Genre</th>
                      
                    </tr>
                </thead>
            <tbody>
               {songs.map((song)=> {
                return (
                    <tr>
                        <td>{song.songId}</td>
                        <td>{song.songName}</td>
                        <td>{song.artist}</td>
                        <td>{song.genre}</td>
                        
                        <td>
                            <button
                            onClick={() => uploadImage(song.songId)}
                            style={styles.button}
                            className='btn btn-sm btn-warning'>
                                Upload Image
                            </button>

                           
                            <button
                            onClick={() => deleteSong(song.songId)}
                            style={styles.button}
                            className='btn btn-sm btn-danger'>
                                Delete
                            </button>
                        </td>
                    </tr>
                )
               })}
            </tbody>
            </table>
       </div>
    )
}


const styles ={
    h3:{
        textAlign:'center',
        margin:20,
        marginBottom:20 ,
    },
    button:{
        marginRight:10,
    },
}
export default MySongs