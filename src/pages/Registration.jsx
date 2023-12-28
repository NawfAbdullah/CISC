import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/Register.css'
import RegisterInput from "../components/Fields/RegisterInput"
import EmailIcon from '@mui/icons-material/Email';
import { AnimatePresence,motion } from "framer-motion";
import Payment from "../components/Payment/Payment";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import Profile from '../assets/profile.jpg'
import Button from "../components/Buttons/Button";
import Tickets from "../components/Payment/Tickets";
import FormCard from "../components/Cards/FormCard";
import PricingCard from "../components/Cards/PricingCard";
import AvatarPicker from "../components/Fields/AvatarPicker";
import axios from "axios";
import Url from "../components/utils/Url";


const Registration = ()=>{
    const {eventId} = useParams()
    const [event,setEvent] = useState({competitions:[],workshops:[],discount:[],fees:[]})
    const [showPaymentScreen,setShowPaymentScreen] = useState(window.innerWidth>758)
    const [cop,setComp] = useState([])
    const [plan,setPlan] = useState(0)
    const [participant,setParticipant] = useState({

    })
    const [alreadyAdded,setAlreadyAdd] = useState(false)

    const [id,setId] = useState(null)
    const [error,setError] = useState('')
    const [profile,setProfile] = useState("")
    const [totalParticipants,setTotalParticpants] = useState([]) 
    const [cardNumber,setCardNumber] = useState(0)
    const handleChange = (e)=>{
        setParticipant((prevValue)=>{
            return {...prevValue,[e.target.name]:e.target.value}
        }) 
        
    }
    const [done,setDone] = useState(false)

    useEffect(()=>{
        const getData =async ()=>{
            const response = await axios.get(`${Url}event/one?id=${eventId}`)
            setEvent(response.data.data);
            setCheckArray(()=>event.competitions.map(competion=>false))
            console.log(response.data.data);
        }
        getData()
    },[eventId])

    const [checkArray,setCheckArray] =  useState([])

    return (
      <div className="register">
        <AnimatePresence>
           <FormCard styleClass={`card ${showPaymentScreen?'jad':''}`}>
                {showPaymentScreen&&<Payment totalParticipants={totalParticipants} event_id={eventId} setParticipant={setParticipant} setError={setError} setScreen={setCardNumber} setId={setId} setDone={setDone} alreadyAdded={alreadyAdded} setAlreadyAdded={setAlreadyAdd}/>}
        {(window.innerWidth>758||!showPaymentScreen)&&<>
        {cardNumber===0&&<div className="main-form">
                <h1>Enter your details</h1>
                    <AvatarPicker setFunction={setProfile}/>
                    <RegisterInput placeholder="Name" name={'name'} value={participant['name']} type='text' icon={<PersonIcon/>} handleChange={handleChange}/>
                    <RegisterInput placeholder="Email" name={'email'} value={participant['email']} type='text' icon={<EmailIcon/>} handleChange={handleChange}/>
                    <RegisterInput placeholder="college" name={'college'} value={participant['college']} type='text' icon={<SchoolIcon/>} handleChange={handleChange}/>
                    <RegisterInput placeholder="Department" name={'department'} value={participant['department']} type='text' icon={<MenuBookIcon/>} handleChange={handleChange}/>
                    <RegisterInput placeholder="Branch" name={'branch'} value={participant['branch']} type='text' icon={<LaptopChromebookIcon/>} handleChange={handleChange}/>
                    <RegisterInput placeholder="RRN(if crescentian)" name={'rrn'} value={participant['rrn']} type='text' icon={<LaptopChromebookIcon/>} handleChange={handleChange}/>
                    <RegisterInput placeholder="Contact_no" name={'contact_no'} value={participant['contact_no']} type='text' icon={<LaptopChromebookIcon/>} handleChange={handleChange}/>
                    <p style={{color:'red'}}>{error}</p>
                    <Button handleClick={()=>{
                        if(id){
                            totalParticipants[id] = participant
                            setCardNumber(prevValue=>prevValue+2)
                        }else{
                            setShowPaymentScreen(false)
                            setCardNumber(prevValue=>prevValue+1)
                        }
                        
                    }}>Next</Button>
                </div>}
        {cardNumber===1&& <div className="plan">
                    <PricingCard title={'Basic'} price={event.fees[0]/100} type={"basic"} features={event.workshops.map(workshop=>workshop.plan==0&&workshop.title)} handleClick={()=>{
                        setPlan(0);
                        setCardNumber(prevValue=>prevValue+1);
                        setParticipant(prevValue=>({...prevValue,price:event.fees[0]}));
                        setShowPaymentScreen(window.innerWidth>758)}}/>
                    <PricingCard title={'Combat'} price={"Welcome to the challenge"} type={"arena"} features={event.competitions.map(workshop=>workshop.title)} handleClick={()=>{
                        setPlan(2);
                        setCardNumber(prevValue=>prevValue+2);
                        setParticipant(prevValue=>({...prevValue,price:0}));
                        setShowPaymentScreen(window.innerWidth>758)
                        }}/>
                    <PricingCard title={'Premium'} price={event.fees[1]/100} type={"premium"} features={event.workshops.map(workshop=>workshop.title)} 
                        handleClick={()=>{
                            setPlan(1);
                            setCardNumber(prevValue=>prevValue+1);
                            setParticipant(prevValue=>({...prevValue,price:event.fees[1]}));
                            setShowPaymentScreen(window.innerWidth>758)
                            }}/>
                </div>
                }

            {cardNumber==2&&<div className="competition">
                <PricingCard title={'Combat'} price={"Welcome to the challenge"} type={"arena"} features={event.competitions.map(workshop=>workshop.title)} handleClick={()=>{
                            setCardNumber(prevValue=>prevValue+1);
                            setParticipant(prevValue=>({...prevValue}));
                            setShowPaymentScreen(window.innerWidth>758)
                            }}/>
                
                </div>}
        {cardNumber===3&&<div className="competition">
            {event.competitions.map((content,index)=>{
                    return (
                        <div className="check-container">
                            <input type="checkbox" placeholder={content.title} value={content._id} checked={(id&&participant.competition_ids)?participant.competition_ids.includes(content._id):checkArray[index]} onChange={(e)=>{                                
                                console.log('x');
                                if(e.target.checked){
                                    setComp(prevValue=>[...prevValue,e.target.value])
                                    console.log('y');
                                    setParticipant(prevValue=>{
                                        prevValue.price+=content.fees
                                        return {
                                            ...prevValue,
                                            price:prevValue.price
                                        }
                                    })
                                    
                                }else{
                                    console.log('z');
                                    console.log(participant.price);
                                    setComp(prevValue=>prevValue.filter(compe=>compe!=content.id))
                                    setParticipant(prevValue=>{
                                        prevValue.price-=content.fees
                                        return {
                                            ...prevValue,
                                            price:prevValue.price
                                        }
                                    })
                                    
                                }
                                
                            }}/>
                            <p>{content.title}-{content.fees!=0?'₹'+ String(content.fees/100):'Free'}</p>
                        </div>
                    )
                })
            }
            <Button 
                handleClick={()=>{
                    if(!id){
                        if(cop.length>0){
                            console.log('hit');
                            participant.competition_ids = cop
                        }else{
                            console.log('shit');
                            try{
                                delete participant.competition_ids;
                            }catch(err){
                                console.log(err);
                            }
                        }
                        participant.paymentStatus = false
                        participant.profile_pic = profile
                        setTotalParticpants(prevValue=>[...prevValue,{
                            ...participant,
                            plan:plan,
                            competition_ids:cop,
                            age:19,
                            photo:profile
                        }])
                    }else{
                        if(cop.length>0){
                            console.log('hit');
                            participant.competition_ids = cop
                        }else{
                            console.log('shit');
                            try{
                                delete participant.competition_ids;
                            }catch(err){
                                console.log(err);
                            }
                        }
                        totalParticipants[id] = participant
                    }


                    setCardNumber(prevValue=>prevValue+1)
                }}
            >
                Submit
            </Button>
                
                </div>}
        {cardNumber===4&&!done&&<div>
                    {event.discount.map((offer)=>{
                        return <p>Adding {offer.count} participant will give you {offer.percent}% discount</p>
                    })}
                    
                    
                    <Button handleClick={()=>{
                            setComp([])
                            setParticipant({})
                            setCardNumber(0)
                            
                    }}>
                        Add Another
                    </Button>
                </div>
            }
                            
        </>}
           </FormCard>
        </AnimatePresence>
        {window.innerWidth<758&&<Button type={'floating'} handleClick={()=>setShowPaymentScreen(prevValue=>!prevValue)}>{showPaymentScreen?"Back to Register":"Go to payment"}</Button>}
      </div> 
    );
}
 
export default Registration;


/*
<a href="https://www.flaticon.com/free-icons/group" title="group icons">Group icons created by Freepik - Flaticon</a>
Photo by <a href="https://unsplash.com/@polarmermaid?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anne Nygård</a> on <a href="https://unsplash.com/photos/graphical-user-interface-application-x07ELaNFt34?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
*/