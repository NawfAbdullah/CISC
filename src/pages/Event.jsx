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
    const [workShopsArray,setWorkShopsArray] = useState({
        Day1:[],
        Day2:[]
    })
    useEffect(()=>{
        const getData =async ()=>{
            const response = await axios.get(`${Url}event/one?id=${eventId}`)
            setEvent(response.data.data);
            setDate(new Date(response.data.data.date))
            setWorkShopsArray({ Day1:[],
                Day2:[]})
            response.data.data.workshops.map((workshop,index)=>{
                console.log(workshop);
                if(workshop.day==0){
                    setWorkShopsArray(prevValue=>{
                        return {
                            ...prevValue,
                            Day1:[...prevValue.Day1,workshop]
                        }
                    })
                }else{
                    setWorkShopsArray(prevValue=>{
                        return {
                            ...prevValue,
                            Day2:[...prevValue.Day2,workshop]
                        }
                    })
                }
            })
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
                <p><span><AccessTimeFilledRoundedIcon /></span><span>{date.getDate()},{months[date.getMonth()]} {date.getFullYear()}</span></p>
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
            <section id="sponsors">
                {event?.sponsors?.map((sponsor,index)=><div key={index} className='sponsor'><img src={sponsor.logo}/><p>{sponsor.name}</p></div>)}
            </section>
            <section>
                <h2 id='mai'>Our events</h2>
                <div className="events-list">
                    {event?.competitions.map((content,index)=>{
                        
                        return <div className="list-item">
                            <h2 style={{
                                textAlign:window.innerWidth>550?'left':'center'
                            }}>{content.title.charAt(0).toUpperCase() + content.title.slice(1)}</h2>
                            <p className='sub'>Price: ₹{Number(content.fees)/100}</p>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                
                                <p dangerouslySetInnerHTML={{__html:content.description}}></p>
                            </div>
                        </div>
                    })}
                </div>
            </section>
            <section id='mai'>
                <h2>Workshops</h2>
                <h3 className='day'>Day 1</h3>
                {workShopsArray.Day1.map((content,index)=>{
                        return <div className="list-item">
                            <h2 className='nawfAbdullah' style={{
                                textAlign:window.innerWidth>550?'left':'center'
                            }}>{content.title.charAt(0).toUpperCase() + content.title.slice(1)}</h2>
                            <p className='sub'>Price:₹{Number(content.fees)/100}</p>
                            <p className='sub'>Package:{content.plan===0?'Basic':'Premium'}</p>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                <div className='xyz'>
                                    <img src={content.speaker.photo} alt="" />
                                    <p> {'Speaker : '+content.speaker.name} </p>
                                    <p>{content.description}</p>
                                </div>
                            </div>
                        </div>
                    })}

                <h3 className='day'>Day 2</h3>
                {workShopsArray.Day2.map((content,index)=>{
                        return <div className="list-item">
                            <h2 style={{
                                textAlign:window.innerWidth>550?'left':'center'
                            }}>{content.title.charAt(0).toUpperCase() + content.title.slice(1)}</h2>
                            <p className='sub'>Price:₹{Number(content.fees)/100}</p>
                            <p className='sub'>Package:{content.plan===0?'Basic':'Premium'}</p>
                            <div className={`inner-list ${index%2===0?'even':'odd'}`}>
                                <img src={content.img} alt="" />
                                <div className='xyz'>
                                    <img src={content.speaker.photo} alt="" />
                                    <p> {'Speaker : '+content.speaker.name} </p>
                                    <p>{content.description}</p>
                                </div>
                            </div>
                        </div>
                    })}

            </section>

        </div>
    </div>
}

export default Event