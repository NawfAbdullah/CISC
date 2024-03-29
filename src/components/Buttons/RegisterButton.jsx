import { useNavigate } from 'react-router-dom'
import Button from './Button'

const RegisterButton = ({eventId})=>{
    let navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/registerfor/${eventId}`);
    }
    return <Button highlight={true} handleClick={handleClick}>Register</Button>
}

export default RegisterButton;