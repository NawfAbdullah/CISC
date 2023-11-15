import '../../styles/Button.css'

const Button = ({children,handleClick,highlight,type})=>{

    return <button className={`button ${highlight&&'bounce'} ${type}`} onClick={handleClick}>{children}</button>
}

export default Button;


;