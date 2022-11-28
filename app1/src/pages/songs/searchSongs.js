import Input from '../../components/input'
import Button from '../../components/button'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'

const SearchSongs = () => {
  const [listings, setListings] = useState([])
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  const searchSongs = () => {
    if (searchText.length === 0) {
      toast.error('Please Enter Name of Song')
    } else {
      axios
        .get(config.serverURL + '/song/search/' + searchText, {
          headers: {token : sessionStorage['token']},
        })
        .then((response) => {
          const result = response.data
          console.log(result)
          if (result['status'] === 'success') {
            setListings(result['data'])
          } else {
            toast.error(result['error'])
          }
        })
    }
  }

    
    

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 20 }}>Search</h1>
      <Input
        onChange={(e) => setSearchText(e.target.value)}
        title='Search Song'
      />
      <center><Button title='Search' onClick={() => searchSongs()} /></center>

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
                            
                        {/* <div
                            style={{
                                width: 30,
                                height: 30,
                                position: 'absolute',
                                right: 40,
                                top: 30,
                            }}>
                                
                        </div> */}
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
                                By <u>{listing.artist}</u> (Artist) <br />
                                
                                Genre:- <u>{listing.genre}</u>
                                
                            </p>
                            
                           
                            
                        </div>

                       

                    </div>
                    )
                })}
            </div>
    </div>
  )
}

export default SearchSongs
