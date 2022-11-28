import { useState} from 'react';
import Input from '../../components/input';
import TextArea from '../../components/textArea';
import Button from '../../components/button';
import { toast } from 'react-toastify';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const AddSong = () =>{
   

    const [songName,setsongName] = useState('')
    const [artist,setArtist] = useState('')
    
    const [genre,setGenre] = useState('')
   


    const navigate = useNavigate();

    const addSong = () => {
      if (songName.length === 0) {
         toast.error('Enter Song Name')
       } else if (artist.length === 0) {
         toast.error('Enter Artist')
       } else if (genre.length === 0) {
         toast.error('Enter Genre')
       }  else{
            const body = {
               songName,
               artist,
               genre,
               
            }

            axios.post(config.serverURL + '/song/addSong',body, {
               headers : {token:sessionStorage['token']},
            }).then((response) => {
               const result = response.data
               if(result['status'] === 'success'){
                  toast.success('Successfully added a new Song');
                  navigate('/my-songs')
               }else{
                  toast.error(result['error'])
               }
            }).catch((error) => {
               console.log(error)
            })
            
       }
    }



    return (
        <div className="container" style={styles.container}>
            <h3 style={{textAlign:'center', marginBottom:50, marginTop:20}}>Add Song</h3>

            <div className="row" style={{marginBottom:60}}>
                <div
                className="col"
                style={{borderRightStyle:'solid', borderRightColor:'lightgrey'}}>

                <Input
                title='Name of the Song'
                onChange={(e)=>{
                  setsongName(e.target.value)
                }}>
                </Input>


                <Input
                title='Artist'
                onChange={(e)=>{
                   setArtist(e.target.value)
                }}>
                </Input>



                

                

                
                </div>

                <div
                className='col'>

               
                
                
                <Input
                title='Genre'
                onChange={(e)=>{
                  setGenre(e.target.value)
                }}>
                </Input>

                
                </div>
            </div>

            <div className='row' style={{textAlign:'center'}}>
               <div className='col'>
               <Button title='Add Song' onClick={addSong}></Button>
               </div>
               
            </div>

        </div>
        
        
    )
}

const styles = {
    container:{
        marginTop:50,
        borderStyle:'solid',
        borderColor:'#3FD2C7',
        marginBottom:80,
        borderRadius:10,
    }
} 

export default AddSong;
