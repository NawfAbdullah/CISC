import { useEffect, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import ScrollTrigger from "gsap/src/ScrollTrigger";
import Lap from '../assets/images/lapt.png'
import '../styles/Home.css'
import Members from '../components/Members';
import EventCard from '../components/Cards/EventCard';
import Contactus from '../assets/images/contact-us.svg'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WebIcon from '@mui/icons-material/Web';
import {motion} from 'framer-motion';
import axios from 'axios';


const Home = ()=>{
    gsap.registerPlugin(ScrollTrigger)

    const today = new Date()
    const [events,setEvents] = useState([])
    const handleSubmit = (e)=>{
      e.preventDefault()
    }

    useLayoutEffect(()=>{
      gsap.from('.cards',{
        x:-200,
        scale:0.7,
        opacity:0,
        duration:0.5,
        scrollTrigger:{
          trigger:'.events',
          start:'top 60%',
          end:'bottom center',
        }
      })
    },[])
    useLayoutEffect(()=>{
        gsap.to('.web-dev',{
            x:window.innerWidth<600?0:-400,
            y:window.innerWidth<600?600:700,
            scale:0.7,
            scrollTrigger:{
              scrub: 0.75,
              start: "top top",
              endTrigger:'.about-us',
              end: window.innerWidth>400?"bottom 70%":"70% 70%",
              pin:true,
              pinSpacing:false,
            }
        })

        var spriteSheet = {
            width: 4921/6,
            height: 5079/11,
            total: 63,
            cols: 6,
            rows: 11,
            duration: 1,
          };
          
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              scrub: 0.75,
              start: "top top",
              endTrigger:'.about-us',
              end: window.innerWidth>400?"bottom 70%":"70% 70%",
            },
          });
          
        
        for (var i = 0; i < spriteSheet.total; i++) {
            tl.set(
              ".lap-frames",
              {
                x: (i % spriteSheet.cols) * -spriteSheet.width,
                y: Math.floor(i / spriteSheet.cols) * -spriteSheet.height,
              },
              (i / (spriteSheet.total - 1)) * spriteSheet.duration
            );
          }
    },[])


    useEffect(()=>{
      const getEvents = async ()=>{
        const response = await axios.get("https://build-club-backend-production.up.railway.app/event/all");
        setEvents(response.data.data.slice(0,3));
      }
      getEvents()
    },[])
    return <div className="home">
        <section className="hero">
            <h1 className='title'>Crescent Innovation and Startup Club</h1>
            <div class="web-dev">
                <div class="spaces">
                    <div class="animate-lap">
                        <img src={Lap} alt="macbook" className="lap-frames" style={{translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)"}} />
                    </div>
                </div>
            </div>
            <div className="about-us" id='about-us'>
                <h2>About Us</h2>
                <div className="content">
                    <div className="lap-space">

                    </div>
                    <div className="detail">
                        <p>Student-Run Entrepreneurship Club sparks innovation through workshops, pitch sessions, and collaborative projects. Members, driven by a shared passion for business, benefit from guest lectures and mentorship programs, forging a culture of creativity. The club, a nexus for diverse talents, prepares aspiring entrepreneurs with real-world insights, uniting students across disciplines for a dynamic, future-focused learning experience.</p>
                    </div>
                </div>
            </div>
            
        </section>
        <Members />
        <section className='events' id='events'>
          <h2>Events</h2>
          <div className="cards">
            {events.map((event,index)=>{
              return (
                <EventCard key={index} title={event.name} image={event.img} color={today<new Date(event.date)? "#0BD6A7":"#3b3eae"} desc={event.description} date={event.date} id={event._id}/>
              )
            })}
          
          </div>
        </section>
        <section className="contact-us" id='contact-us'>
          <form onSubmit={handleSubmit}>
            <h2>Contact us</h2>
            <input type="text" name="name" id="name" className="name" placeholder='name'/>
            <input type="email" name="email" id="email" className="email" placeholder='email'/>
            <textarea name="" id="" cols="30" rows="10" placeholder='message'></textarea>
            <button type='submit'>Submit</button>
          </form>
          <motion.img src={Contactus} initial={{
            x:400,
            opacity:0.1
          }}
          whileInView={{
            x:0,
            opacity:1
          }}
          alt="" className="contact" />
        </section>
        <footer>
          <p>Copyright &copy; {today.getFullYear()}</p>
          <div className="icons">
            <a href="https://www.instagram.com/cisc_buildclub/" className="icon" target='_blank'><InstagramIcon /> </a>
            <a href="#" className="icon"><FacebookIcon /></a>
            <a href="#" className="icon"><TwitterIcon /></a>
            <a href="/" className="icon"><WebIcon /></a>
          </div>
          <p>Made with ❤️ by <a href='https://in.linkedin.com/in/nawf-abdullah-69474a225' target='_blank'>Nawf Abdullah</a> and <a href='https://www.linkedin.com/in/ali-shazin-6157b5251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' target='_blank'>Ali izzath shazin</a></p>
        </footer>
    </div>
}

export default Home