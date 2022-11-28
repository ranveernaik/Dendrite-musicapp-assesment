const Input = (props) =>{
    const { title,type,onChange,placeHolder,value } = props;
    return (
        <div className='mb-3'>
            <label>{title}</label>
            <input
            value={value}
            onChange={onChange}
            type={type ? type :'text' }
            placeholder={placeHolder}
            className='form-control'>
            </input>
        </div>
    )
}

export default Input;
