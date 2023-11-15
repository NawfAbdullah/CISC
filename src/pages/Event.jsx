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
    const [event,setEvent] = useState({competitions:[],workshops:[]})
    const {eventId} = useParams()
   

    useEffect(()=>{
        const getData =async ()=>{
            const response = await axios.get(`${Url}event/one?id=${eventId}`)
            setEvent(response.data.data);
            console.log(response.data.data);
        }
        getData()
    },[eventId])

    useEffect(()=>{
        document.querySelector('.event-page').scrollIntoView({ 
            behavior: 'smooth' ,
          });
    },[])
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
                <p><span><AccessTimeFilledRoundedIcon /></span><span>Upcoming</span></p>
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
                                textAlign:index%2===0?'left':'right'
                            }}>{content.title}</h3>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                <p>{content.description}</p>
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
                                textAlign:index%2===0?'left':'right'
                            }}>{content.title}</h3>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                <p>{content.description}</p>
                            </div>
                        </div>
                    })}

            </section>
            {/* <Tickets name={'Nawf Abdullah'} event_name={"E-Summit"} pic="https://images.unsplash.com/photo-1697218694642-3dcb1841d85b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"/> */}
        </div>
    </div>
}

export default Event