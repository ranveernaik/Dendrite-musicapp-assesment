import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import config from '../../config'
import Input from '../../components/input'
import Button from '../../components/proceedToBuyButton'
import { useNavigate } from 'react-router-dom'



const MyPlaylist = () => {


    const [listings,setListings] = useState([]);
    const [items,setItems] = useState(0);
    const [subTotal,setSubTotal] = useState(0);



    const navigate = useNavigate()
  

     // load the songs as soon as the component gets loaded
     useEffect(() => {
        loadPlaylist()
    },[])


    // load the playlist
    const loadPlaylist = () => {
        axios.get(config.serverURL +'/playlist/myplaylist',{
            headers:{token : sessionStorage['token']},
        }).then((response) => {
            const result = response.data;
            if(result['status'] === 'success')
            {
                setListings(result['data'])
            }else{
                toast.error(result['error'])
            }
        })
    }

    // remove from playlist
    const removeFromPlaylist = (listing) => {
        axios.delete(config.serverURL+'/playlist/remove/'+listing.songId,{
            headers : {token : sessionStorage['token']}
        }).then((response)=>{
            const result = response.data;
            if(result['status'] === 'success'){
                toast.warning(`${listing.songName} removed from Playlist!`)
                // reload 
                loadPlaylist()
            }else{
                toast.error(result['error'])
            }
        })
    }

    


     

    return (
        <div className='container' style={{marginBottom:180}}>
              <h3 style={styles.h3}>My Playlist</h3>
             
             {listings.length === 0 && (
                <u><center><h4>Your Playlist is empty! Add songs from home page</h4></center></u>
             )}
            <div className='container' style={{marginTop:30}}>
                {listings.map((listing) => {
                    const imageUrl = config.serverURL + '/' + listing.image
                    return (
                        <div className='row'>
                            <hr></hr>
                            <div 
                        key={listing.songId}
                        className='col-2'
                        style={{
                            position: 'relative',
                            padding: 20,
                            display: 'inline-block',
                            cursor: 'pointer', 
                        }}>
                            
                        <img
                            style={{
                            height: 180,
                            width: '100%',
                            display: 'block',
                            borderRadius: 10,
                        }}
                        src={imageUrl}
                        ></img>
                        
                    </div>
                    
                    <div className='col-7' style={{ marginTop: 20,marginBottom:20}}>
                    <h4 className='card-title'>{listing.songName}</h4>
                    <p >
                        By <u>{listing.artist}</u> (Artist)<br />
                    
                        Genre:- <u>{listing.genre}</u>
                    </p>
                   
                    
                </div>
                <div className='col-3' style={{ marginTop: 20,marginBottom:20}}>
                   
                    <button onClick={() => removeFromPlaylist(listing)} style={styles.button}>Remove from Playlist</button>
                </div>
                    
                   
                        </div>
                        
                    )
                })}
            </div>
            <hr></hr>
            <br></br>
            <br></br>
            
            

            

        </div>




)
}
const styles = {
    button: {
        position: 'relative',
        width: '68%',
        height: 40,
        backgroundColor: '#E44343',
        color: 'white',
        borderRadius: 5,
        border: 'none',
        weight : 'bold',
        
    },

    h3: {
        margin:20,
        marginBottom:20,
        textAlign:'center',
    }
}

export default MyPlaylist;
