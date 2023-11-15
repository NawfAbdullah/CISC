import '../..//styles/RegisterInput.css'

const RegisterInput = ({placeholder,value,handleChange,type,icon,name,max,min,width})=>{

    return <div className='register-input' style={{width:width?width:'100%'}}>
            {icon}
            <input placeholder={placeholder} name={name} type={type} onChange={handleChange} value={value} max={max?max:4} min={min?min:1} />
        </div>
}

export default RegisterInput;