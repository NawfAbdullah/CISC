import '../../styles/PricingCard.css'
import Button from '../Buttons/Button';

const PricingCard = ({type,title,price,features,handleClick}) => {
    return <div className={`pricing-card ${type}`}>
        <h2>{title}</h2>
        <p className='pricing'>{price}</p>
        <hr />
        <h3>Features</h3>
        <ul>
            {features.map((feature,index)=><li key={index}>{feature}</li>)}
        </ul>
        <Button handleClick={handleClick}>Proceed</Button>
    </div>;
}
 
export default PricingCard;