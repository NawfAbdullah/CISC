import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import '../styles/Navbar.css'
import { useState } from 'react';
import Logo from '../assets/images/logo.png'
import { Close } from '@mui/icons-material';
import {motion,AnimatePresence} from 'framer-motion';


const Navbar = ()=>{
    const [showMenus,setShowMenu] = useState(window.innerWidth>720)
    return <div className="navbar">
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        {showMenus&&
        <AnimatePresence>
            <motion.div className="menus" 
                initial={{
                    x:-400
                }}
                animate={{
                    x:0
                }}
                exit={{
                    x:-400
                }}
            >
                <p onClick={()=>{
                    if(window.location=='/'){
                        document.querySelector('.hero').scrollIntoView({ 
                            behavior: 'smooth' ,
                          });
                    }else{
                        window.location = '/'
                    }

                }}>Home</p>
                <p onClick={()=>{
                    if(window.location.pathname=='/'){
                    document.querySelector('#about-us').scrollIntoView({ 
                        behavior: 'smooth' ,
                      });
                    }else{
                        window.location ='/'
                        document.querySelector('#about-us').scrollIntoView({ 
                            behavior: 'smooth' ,
                          });
                    }
                }}
                >About us</p>
                <p onClick={()=>{
                    if(window.location.pathname=='/'){
                    document.querySelector('#events').scrollIntoView({ 
                        behavior: 'smooth' ,
                      });
                    }else{
                        window.location ='/'
                        document.querySelector('#events').scrollIntoView({ 
                            behavior: 'smooth' ,
                          });
                    }
                }}>Events</p>
                <p onClick={()=>{
                    
                    if(window.location.pathname=='/'){
                    document.querySelector('#contact-us').scrollIntoView({ 
                        behavior: 'smooth' ,
                      });
                    }else{
                        window.location ='/'
                        document.querySelector('#contact-us').scrollIntoView({ 
                            behavior: 'smooth' ,
                          });
                    }
                }}>Contact us</p>
            </motion.div>
        </AnimatePresence>
        }
        <div className="burger" onClick={()=>{
            setShowMenu(!showMenus)
            }}>
            {showMenus?<Close />:<MenuRoundedIcon />}
        </div>
    </div>
}

export default Navbar
