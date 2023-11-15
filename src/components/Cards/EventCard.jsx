import '../../styles/EventCard.css'
import Temp from '../../assets/images/temp.jpg'
import { useNavigate } from 'react-router-dom'


const EventCard = ({title,desc,date,color,image,id})=>{
    let navigate = useNavigate()
    let event_date = new Date(date)
    return <div className="event-card">
        <img src={image} alt="" />
        <h3>{title}</h3>
        <p className='date'><span style={{backgroundColor:color}}></span><p>{event_date.getDate()}/{event_date.getMonth()+1}/{event_date.getFullYear()}</p></p>
        <p>{desc}</p>
        <button onClick={()=>navigate(`/event/${id}`)}>View</button>
    </div>
}

export default EventCard