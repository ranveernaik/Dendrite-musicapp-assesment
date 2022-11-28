import Button from '../../components/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'

const UploadImage = () => {
    // selected song id
    const [songId, setSongId] = useState()
  
    // used to keep the selected file
    const [file, setFile] = useState()
  
    // used to get the state sent by previous screen
    const location = useLocation()
  
    // used to navigate
    const navigate = useNavigate()
  
    // grab the song id
    useEffect(() => {
      const { songId } = location.state
      setSongId(songId)
      
    }, [])
  
    const uploadImage = () => {
      // FormData is used to send the multipart file
      const body = new FormData()
  
      // add the file
      body.set('photo', file)
  
      axios
        .post(config.serverURL + '/song/upload-image/' + songId, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: sessionStorage['token'],
          },
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'success') {
            toast.success('Successfully uploaded Image File')
            navigate('/my-songs')
          } else {
            toast.error('Error while uploading file!!!')
          }
        })
    }
  
    return (
      <div className='container'>
        <h3 style={{ textAlign: 'center', margin: 20 }}>Upload Image</h3>
  
        <div className='mb-3'>
          <label>Select Image</label>
          <input
            onChange={(e) => {
              // set the selected file in the state
              setFile(e.target.files[0])
            }}
            className='form-control'
            type='file'>
            </input>
            <div  style={{textAlign:'center'}}>
            <button onClick={uploadImage} style={styles.button}>Upload Photo</button>
            </div>

        </div>
      </div>
    )
  }
  
  const styles = {
    button: {
        position: 'relative',
        width: '50%',
        height: 40,
        backgroundColor: '#3FD2C7',
        color: 'white',
        borderRadius: 5,
        border: 'none',
        marginTop: 10,
        marginBottom:70,
    }
}

  export default UploadImage
  