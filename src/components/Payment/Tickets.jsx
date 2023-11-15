import '../../styles/Tickets.css'
import Profile from '../../assets/profile.jpg'
import QRCode from 'react-qr-code';

const Tickets = ({name,event_name,pic,orderId,userId,price}) => {
    return <div className="Ticket">
        <img src={pic?pic:Profile} alt="123"/>
        <div className="right">
            <h1>{name}</h1>
            <p>{event_name}</p>
            <p>₹{price/100}</p>
        </div>
        <QRCode
                        size={100}
                        style={{ height: "auto", maxWidth: "100%", width: "100px" }}
                        value={orderId}
                        viewBox={`0 0 256 256`}
            />
    </div>;
}
 
export default Tickets;