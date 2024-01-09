import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import Button from "../Buttons/Button";
import { ExpandMore } from "@mui/icons-material";
import '../../styles/Payment.css'
import { Modal, Paper , Box,Accordion,AccordionSummary,AccordionDetails} from "@mui/material";
import Profile from '../../assets/profile.jpg'
import axios from "axios";
import url from "../utils/Url";
import Tickets from "./Tickets";
import jsPDF from 'jspdf';
import QRCode from "react-qr-code";
import Logo from '../../assets/images/logo.png'
import { Edit } from "@mui/icons-material";


export default function Pay({totalParticipants,event_id,setParticipant,setError,setScreen,setId,event,setDone,alreadyAdded,setAlreadyAdded,setShowPaymentScreen}) {
  const [Razorpay] = useRazorpay();
  
  const [paid,setPaid] = useState(false)
  const [orderId,setOrderId] = useState('')
  const [price,setPrice] = useState(0)
  const [esr,setEsr] = useState('')
  
  const [ticketHolders,setTicketHolders] = useState([])
  const [total,setTotal] = useState(0)
  const reportTemplateRef = useRef(null);
  const [openModal,setOpenModal] = useState(false)
  const [regulParticipants,setRegulParticipant] = useState([])
  const [regulAmount,setRegulAmount] = useState(0)
  const [deleteUrl,setDeleteUrl] = useState('')
  
  
  const handlePayment = useCallback(async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id:event_id,
        participants:totalParticipants
      })
    };
    if(!alreadyAdded){
      fetch(`${url}event/participant/add`, requestOptions)
        .then(response => response.json())
        .then(data => {
          
          console.log('original data');
          console.log(data);
          console.log('original ends');
          
          if(data.err_msg){
            if (data.payment_retry) {
              console.log('xxx',data.delete_url);
              setOpenModal(true)
              setOrderId(data.order_id)
              setEsr(data.err_msg)
              setRegulParticipant(data.participants)
              setRegulAmount(data.amount)
              setDeleteUrl(data.delete_url.slice(1))
            }else{
              setError(data.err_msg)
              console.log(totalParticipants);
              console.log(data);
              setParticipant(totalParticipants[data.field.split('.')[1]])
              setId(data.field.split('.')[1])
              setScreen(0)
              setShowPaymentScreen(false)
            }
          }else{
            setAlreadyAdded(true)
            setOrderId(data.order_id)
            setPrice(data.bill_details.total_with_discount)
            const options = {
              "key": "rzp_test_CPeRc97qEEIzyk", // Enter the Key ID generated from the Dashboard
              "amount": data.bill_details.total_with_discount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Build Club",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: data.order_id,
            handler: async (response) =>{
              console.log(response);
              const data = {
                  event_id:event_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
              };
              const response2 = await axios.post(`${url}event/participant/verify-payment`,data)
              console.log(response2.data.success_msg);
              if(response2.data.success_msg==="verified successfully"){
                console.log('processing');
                setTicketHolders(totalParticipants)
                setPaid(true)
                setDone(true)
                alert('Successfully registered Ticket sent to your mails')
              }
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "Crescent Institute of Science and Technology",
            },
            theme: {
              color: "#0BD6A7",
            },
          };

          const rzpay = new Razorpay(options);
          rzpay.open();
        }
        });

      }else{
        const options = {
          "key": "rzp_test_CPeRc97qEEIzyk", // Enter the Key ID generated from the Dashboard
          "amount": price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Build Club",
        description: "Test Transaction",
        image: Logo,
        order_id: orderId,
        handler: async (response) =>{
          const data = {
              event_id:event_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
          };
          const response2 = await axios.post(`${url}event/participant/verify-payment`,data)
          console.log(response2.data.success_msg);
          if(response2.data.success_msg==="verified successfully"){
            console.log('processing');
            setOpenModal(false)
            setTicketHolders(totalParticipants)
            setPaid(true)
            setDone(true)
            alert('veified successfully')

          }
        },
        notes: {
          address: "Crescent Innovation and startup clup",
        },
        theme: {
          color: "#0BD6A7",
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open();
      }
     

  }, [Razorpay,totalParticipants]);
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  useEffect(()=>{
    if(totalParticipants){
      console.log(totalParticipants)
      var x = 0
      totalParticipants.forEach(participant => {
        x+=participant.price
      });
      setTotal(x);
      console.log(total);
    }else if(totalParticipants.length===0){
      setTotal(totalParticipants[0].price)
    }
    
  },[totalParticipants])


const handleNewRegistration = ()=>{
  const getData = async () => {
    console.log(`${url}${deleteUrl}`);
    const response = await axios.delete(`${url}${deleteUrl}`)
    if(response.data.success_msg){
      setAlreadyAdded(false)
      handlePayment()
    }
  }

  getData()
}



const handleContinue = ()=>{
            const options = {
              "key": "rzp_test_CPeRc97qEEIzyk", // Enter the Key ID generated from the Dashboard
              "amount": regulAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Build Club",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderId,
            handler: async (response) =>{
              console.log(response);
              const data = {
                  event_id:event_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
              };
              const response2 = await axios.post(`${url}event/participant/verify-payment`,data)
              console.log(response2.data.success_msg);
              if(response2.data.success_msg==="verified successfully"){
                console.log('processing');
                setTicketHolders(totalParticipants)
                setPaid(true)
                setDone(true)
                alert('Successfully registered Ticket sent to your mails')
              }
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "Crescent Institute of Science and Technology",
            },
            theme: {
              color: "#0BD6A7",
            },
          };

          const rzpay = new Razorpay(options);
          rzpay.open();
}








  return (
    <div className="Pay" style={{width:paid?'100%':'inherit',}}>

      <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{display:'flex',justifyContent:'center',alignItems:'center'}}
      >
        <Box sx={{ width: 600,backgroundColor:'white',borderRadius:5,color:'black' }}>
          <h2 id="parent-modal-title">Order id: {orderId}</h2>
          <div className='error_kadamai' id="parent-modal-description">
           <p>{esr}</p>
           <div className="sub">
            <p>Details</p>
            {regulParticipants.map((partici,index)=>{
              return <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>{partici.email}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <ul id="plan_d_alreadyPaid">
                  <li>Name:{partici.name}</li>
                  <li>Plan:{partici.plan==1?'Premium':'Basic'}</li>

                </ul>
              </AccordionDetails>
            </Accordion>
            })}
           </div>
          </div>
          <div className="m-btn-cont"><Button handleClick={handleContinue}>Continue</Button><Button handleClick={handleNewRegistration}>New Registration</Button></div>
        </Box>
      </Modal>
      <h3>Total fees - {Math.floor(total/100)}</h3>
      {!paid?<><div className="participants-container">
        {totalParticipants.length===0&&<Paper elevation={4}>
            <p className="name">No participants registered</p>
          </Paper>}
        {totalParticipants.map((ticketHolder,index)=>(
        <Paper elevation={4}>
          <img src={ticketHolder.profile?ticketHolder.profile:Profile} alt=""/>
          <p className="name">{ticketHolder.name}</p>
          <p className="price">₹ {ticketHolder.price/100}</p>
          <span  onClick={()=>{
            setError('edit')
            setId(index)
            setParticipant(totalParticipants[index])
            setScreen(0)
            setShowPaymentScreen(false)
            }}><Edit style={{fill:'#0BD6A7'}} /></span>
            
        </Paper>))}
      </div>
      
      <Button handleClick={handlePayment}>Check Out</Button></>:
      <div className="participants-container" >
          <p>Screenshot the tickets</p>
          {ticketHolders.map((ticketHolder,index)=>{
          return <Tickets key={index} name={ticketHolder.name} pic={ticketHolder.photo} event_name={event?.title} orderId={orderId} price={ticketHolder.price}/>
        })}
      </div>
      
      }
    </div>
  );
}