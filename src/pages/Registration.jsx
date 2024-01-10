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
import Button from "../components/Buttons/Button";
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
    const [work,setWork] = useState([])
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
        }   
        getData()
    },[eventId])


    return (
      <div className="register">
        <AnimatePresence>
           <FormCard styleClass={`card ${showPaymentScreen?'jad':''}`}>
                {((window.innerWidth>758&&cardNumber!==1)||showPaymentScreen)&&<Payment totalParticipants={totalParticipants} event_id={eventId} setParticipant={setParticipant} setError={setError} setScreen={setCardNumber} setId={setId} setDone={setDone} alreadyAdded={alreadyAdded} setAlreadyAdded={setAlreadyAdd} setShowPaymentScreen={setShowPaymentScreen}/>}
        {(window.innerWidth>758||!showPaymentScreen)&&<>
        {cardNumber===0&&<div className="main-form">
                <h1>Enter your details</h1>
                    <div className="main-form-inner">
                        <AvatarPicker setFunction={setProfile}/>
                        <p style={{color:'red'}}>{error}</p>
                        <RegisterInput placeholder="Name" name={'name'} value={participant['name']} type='text' icon={<PersonIcon/>} handleChange={handleChange}/>
                        <RegisterInput placeholder="Email" name={'email'} value={participant['email']} type='text' icon={<EmailIcon/>} handleChange={handleChange}/>
                        <RegisterInput placeholder="college" name={'college'} value={participant['college']} type='text' icon={<SchoolIcon/>} handleChange={handleChange}/>
                        <RegisterInput placeholder="Department" name={'department'} value={participant['department']} type='text' icon={<MenuBookIcon/>} handleChange={handleChange}/>
                        <RegisterInput placeholder="Branch" name={'branch'} value={participant['branch']} type='text' icon={<LaptopChromebookIcon/>} handleChange={handleChange}/>
                        <RegisterInput placeholder="RRN(if crescentian)" name={'rrn'} value={participant['rrn']} type='text' icon={<LaptopChromebookIcon/>} handleChange={handleChange}/>
                        <RegisterInput placeholder="Contact_no" name={'contact_no'} value={participant['contact_no']} type='text' icon={<LaptopChromebookIcon/>} handleChange={handleChange}/>
                    </div>
                   
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
                    <PricingCard title={'Basic'} price={'₹'+ String(event.fees[0]/100)} type={"basic"} features={event.workshops.map(workshop=>workshop.plan===0&&workshop.title)} handleClick={()=>{
                        setPlan(0);
                        setCardNumber(prevValue=>prevValue+1);
                        setParticipant(prevValue=>({...prevValue,price:event.fees[0]}));
                        setShowPaymentScreen(window.innerWidth>758)}}/>
                    <PricingCard title={'Working staffs and professors'} price={'₹'+ String(event.fees[2]/100)} type={"arena"} features={['All the workshops and competitions']} 
                        handleClick={async ()=>{
                            setPlan(2)
                            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',event.fees[2]);
                            await setParticipant(prevValue=>({...prevValue,price:event.fees[2]}));
                            setShowPaymentScreen(window.innerWidth>758)
                            if(!id){
                                if(cop.length>0){
                                    console.log('hit');
                                    participant.competition_ids = cop
                                }else{
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
                                    plan:2,
                                    price:event.fees[2],
                                    competition_ids:cop,
                                    workshop_ids:work,
                                    age:19,
                                    photo:profile
                                }])
                            }else{
                                totalParticipants[id] = participant
                            }
        
        
                            setCardNumber(4)
                        }}/>
                    <PricingCard title={'Premium'} price={'₹'+ String(event.fees[1]/100)} type={"premium"} features={event.workshops.map(workshop=>workshop.plan===1&&workshop.title)} 
                        handleClick={()=>{
                            setPlan(1);
                            setCardNumber(prevValue=>prevValue+1);
                            setParticipant(prevValue=>({...prevValue,price:event.fees[1]}));
                            setShowPaymentScreen(window.innerWidth>758)
                            }}/>
                </div>
                }

            {cardNumber===2&&<div className="competition">
                <PricingCard title={'Add ons'} price={"Events you can add beyond your package"} type={"arena"} features={event.competitions.map(workshop=>workshop.title)} handleClick={()=>{
                            setCardNumber(prevValue=>prevValue+1);
                            setParticipant(prevValue=>({...prevValue}));
                            setShowPaymentScreen(window.innerWidth>758)
                            }}/>
                
                </div>}
        {cardNumber===3&&<div className="yxy"><div className="competitionx">
        {event.competitions.map((content,index)=>{
                    return (
                        <div className="check-container" style={{
                            borderColor:(cop.includes(content._id)||(id&&participant.competition_ids.includes(content._id)))?'#0BD6A7':'salmon',
                            backgroundColor:(cop.includes(content._id)||(id&&participant.competition_ids.includes(content._id)))?'#adf0e1':'rgb(248, 243, 236)',
                        }} onClick={()=>{
                            if(id){
                                setComp([])
                                if(participant.competition_ids.includes(content._id)){
                                    setParticipant(prevValue=>{
                                        prevValue.competition_ids = prevValue.competition_ids.filter(competition => competition!==content._id)
                                        prevValue.price-=content.fees
                                        return prevValue
                                    })
                                }else{
                                    setParticipant(prevValue=>{
                                        prevValue.competition_ids.push(content._id)
                                        prevValue.price+=content.fees
                                        return prevValue
                                    })
                                }
                            }else{
                                if(cop.includes(content._id)){
                                    setComp(prevValue=>{
                                        return prevValue.filter(co=>co!==content._id)
                                    })
                                    setParticipant(prevValue=>{
                                        prevValue.price-=content.fees
                                        return {
                                            ...prevValue,
                                            price:prevValue.price
                                        }
                                    })
                                }else{
                                    setComp(prevValue=>[...prevValue,content._id])
                                    setParticipant(prevValue=>{
                                        prevValue.price+=content.fees
                                        return {
                                            ...prevValue,
                                            price:prevValue.price
                                        }
                                    })
                                }
                            }
                        }}>
                            <p>{content.title}-{content.fees!==0?'₹'+ String(content.fees/100):'Free'}</p>
                        </div>
                    )
                })
                
            }
            {event.workshops.map((content,index)=>{
                if(content.plan!==plan){
                    return (
                        <div className="check-container" key={index} style={{
                            borderColor:(work.includes(content._id)||(id&&participant.workshop_ids.includes(content._id)))?'#0BD6A7':'salmon',
                            backgroundColor:(work.includes(content._id)||(id&&participant.workshop_ids.includes(content._id)))?'#adf0e1':'rgb(248, 243, 236)',
                        }} onClick={()=>{
                            if(id){
                                setWork([])
                                if(participant.workshop_ids.includes(content._id)){
                                    setParticipant(prevValue=>{
                                        prevValue.workshop_ids = prevValue.workshop_ids.filter(competition => competition!==content._id)
                                        prevValue.price-=content.fees
                                        return prevValue
                                    })
                                }else{
                                    setParticipant(prevValue=>{
                                        prevValue.workshop_ids.push(content._id)
                                        prevValue.price+=content.fees
                                        return prevValue
                                    })
                                }
                            }else{
                                if(cop.includes(content._id)){
                                    setWork(prevValue=>{
                                        return prevValue.filter(co=>co!==content._id)
                                    })
                                    setParticipant(prevValue=>{
                                        prevValue.price-=content.fees
                                        return {
                                            ...prevValue,
                                            price:prevValue.price
                                        }
                                    })
                                }else{
                                    setWork(prevValue=>[...prevValue,content._id])
                                    setParticipant(prevValue=>{
                                        prevValue.price+=content.fees
                                        return {
                                            ...prevValue,
                                            price:prevValue.price
                                        }
                                    })
                                }
                            }
                        }}>
                        <p>{content.title}-{content.fees!==0?'₹'+ String(content.fees/100):'Free'}</p>
                    </div>
                    )
                }
            })}
                
                </div>
                <Button 
                handleClick={()=>{
                    if(!id){
                        if(cop.length>0){
                            console.log('hit');
                            participant.competition_ids = cop
                        }else{
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
                            workshop_ids:work,
                            age:19,
                            photo:profile
                        }])
                    }else{
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
                                                    setError('')
                        setId(null)
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