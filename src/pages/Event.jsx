import '../styles/Event.css'
import { LocationCity } from '@mui/icons-material'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import RegisterButton from '../components/Buttons/RegisterButton';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Url from '../components/utils/Url';
import { useParams } from 'react-router-dom';


const Event = ()=>{
    const today = new Date()
    const [event,setEvent] = useState({competitions:[],workshops:[]})
    const {eventId} = useParams()
   
    const [date,setDate] = useState(new Date())
    useEffect(()=>{
        const getData =async ()=>{
            const response = await axios.get(`${Url}event/one?id=${eventId}`)
            setEvent(response.data.data);
            setDate(new Date(response.data.data.date))
            console.log(response.data.data);
        }
        getData()
    },[eventId])

    useEffect(()=>{
        document.querySelector('.event-page').scrollIntoView({ 
            behavior: 'smooth' ,
          });
    },[])
    const months = ['January','Feburary','March','April','May','June', 'July','August','September','October','November','December']
    return <div className="event-page">
        <div className="banner" style={{
            backgroundImage:`url(${event?.img})`
        }}>
            <h1>{event?.name}</h1>
        </div>
        <div className="event-content">

            <div className='line'></div>
            <div className="summary">
                <p><span><LocationCity /></span> <span>BSA Crescent Institute of Science and Tech,Chennai</span></p>
                <p><span><AccessTimeFilledRoundedIcon /></span><span>{date.getDay()},{months[date.getMonth()]} {date.getFullYear()}</span></p>
                {event.isRegistrationOpen&&<div className="floating">
                    <RegisterButton eventId={eventId}></RegisterButton>
                </div>}
            </div>
            <section>
                <h2>What is this all about?</h2>
                <div className="event-contents">
                    <img src={event?.img} alt=''/>
                    <p>{event?.description}</p>
                </div>
            </section>
            <section>
                <h2>Our events</h2>
                <div className="events-list">
                    {event?.competitions.map((content,index)=>{
                        return <div className="list-item">
                            <h3 style={{
                                textAlign:window.innerWidth>550?(index%2===0?'left':'right'):'center'
                            }}>{content.title}</h3>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                <p dangerouslySetInnerHTML={{__html:content.description}}></p>
                            </div>
                        </div>
                    })}
                </div>
            </section>
            <section>
                <h2>Workshops</h2>
                {event?.workshops.map((content,index)=>{
                        return <div className="list-item">
                            <h3 style={{
                                textAlign:window.innerWidth>550?(index%2===0?'left':'right'):'center'
                            }}>{content.title}</h3>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                <p>{content.description}</p>
                            </div>
                        </div>
                    })}

            </section>

        </div>
    </div>
}

export default Event