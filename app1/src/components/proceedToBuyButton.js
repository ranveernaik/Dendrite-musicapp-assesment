const Button = (props) =>{
    const {title,onClick } = props
    return(
        <button onClick={onClick} style={styles.button}>
            {title}
        </button>
    )
}

const styles={
    button: {
        
        position: 'relative',
        width: '50%',
        height: 40,
        backgroundColor: '#F7CA00',
        color: 'black',
        borderRadius: 5,
        border: 'none',
        marginTop: 10,
        marginBottom:70,
        
       
        
    }
}
 

export default Button;

