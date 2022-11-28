import axios from 'axios'
import { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
// use the dispatch to update the redux store about the signin status

//import the actions from required slice



const Home = ()=>{

    const navigate = useNavigate()
    const [listings,setListings] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const signinStatus = useSelector((state)=> state.authSlice.status) 
    const adminStatus = useSelector((state)=>state.authSlice.statusAdmin)

    // load the songs as soon as the component gets loaded
    useEffect(() => {
        loadSongs()
    },[])

    // load all the songs
    const loadSongs = () => {
        axios.get(config.serverURL + '/song/' , {
            headers : { token : sessionStorage['token'] },
        }).then((response) => {
            const result = response.data;
            if(result['status'] === 'success')
            {
                setListings(result['data'])
                console.log(listings)
            }else{
                toast.error(result['error'])
            }
        })
    }

     
    
    // add to playlist
     const addToPlaylist = (listing) =>{
      axios.post(config.serverURL + '/playlist/' + listing.songId ,
      //no need to write body in post axios request
      {}, {
              headers : {token : sessionStorage['token'] },
      }).then((response) => {
          const result = response.data
          if(result['status'] === 'success'){
              toast.success(`${listing.songName} added to Playlist..`)
          }else{
              let arr = result['error'].code;
              arr = "You are adding same song!!!!"
              toast.error(arr)
          }
      })
  }

  






    return (
        <div className='container'>
            <div style={{}} className='row'>
                {listings.map((listing) => {
                    const imageUrl = config.serverURL + '/' + listing.image
                    return (
                        <div 
                        key={listing.songId}
                        className='col-3'
                        style={{
                            position: 'relative',
                            padding: 20,
                            display: 'inline-block',
                            cursor: 'pointer', 
                        }}>
                            
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                position: 'absolute',
                                right: 40,
                                top: 30,
                            }}>
                                
                        </div>
                        <img 
                            style={{
                            height: 250,
                            width: '100%',
                            display: 'block',
                            borderRadius: 10,
                        }}
                        src={imageUrl}
                        ></img>
                        
                        <div style={{ marginTop: 20,marginBottom:20 }}>
                            <h6 className='card-title'>{listing.songName}</h6>
                            <p>
                                By <u>{listing.artist}</u>  (Artist) <br />
                                Genre:- <u>{listing.genre}</u>
                               
                               
                            </p>
                            
                        </div>
                        
                        
                    {signinStatus && !adminStatus && (
                            <div  className='responsive' style={{textAlign:'center',marginBottom:0}}>
                            <button onClick={() => 
                               {{signinStatus && (addToPlaylist(listing))}} } style={styles.button}>Add to Playlist</button>
                        </div>
                    )}

                       

                    </div>
                    )
                })}
            </div>
        </div>
    )
}
const styles = {
    button: {
        position: 'relative',
        width: '60%',
        height: 40,
        backgroundColor: '#FECD45',
        color: 'black',
        borderRadius: 5,
        border: 'none',
        weight : 'bold',
    },
    button1: {
        position: 'relative',
        width: '68%',
        height: 40,
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 5,
        border: 'none',
        weight : 'bold',
        
    },

}


export default Home