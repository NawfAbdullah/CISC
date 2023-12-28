import { useState } from "react"
import '../styles/Members.css'
import {motion} from 'framer-motion'
import Aftab from '../assets/images/aftab.jpg'
import Akash from '../assets/images/akash.png'
import Fateen from '../assets/images/fateen.png'
import Ham from '../assets/images/hameedha.png'
import Harini from '../assets/images/harini.jpg'
import Irfan from '../assets/images/irfan.png'
import Josh from '../assets/images/joshwa.jpg'
import Luq from '../assets/images/luqman.png'
import Mustafa from '../assets/images/mustafa.jpg'
import Nawf from '../assets/images/nawf.png'
import Pious from '../assets/images/pious.jpg'
import Shan from '../assets/images/shanmu.jpg'
import Varshini from '../assets/images/varshini.jpg'
import Mathan from '../assets/images/mathan.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';


const Members = ()=>{
    
    const [members,setMembers] = useState([{
        name:'Fateen khan',
        img:Fateen,
        role:'president',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:30,
        y:50
    },
    {
        name:'Shanmuganadhan',
        img:Shan,
        role:'Vice President',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:17,
        x:20,
        y:10
    },
    {
        name:'Haamida',
        img:Ham,
        role:'Secretary',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:10,
        x:20,
        y:250
    },
    {
        name:'Nawf Abdullah',
        img:Nawf,
        role:'Technical Comittee Head',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:17,
        x:10,
        y:50
    },
    {
        name:'Aftab Sheik',
        img:Aftab,
        role:'Technical Comittee Head',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:20,
        x:10,
        y:50
    },
    {
        name:'Joshva',
        img:Josh,
        role:'Convention Planner',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:20,
        x:210,
        y:150
    },
    {
        name:'Akash',
        img:Akash,
        role:'Convention Planner',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
    {
        name:'Pious',
        img:Pious,
        role:'2nd year representative',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
    {
        name:'Harini Sri',
        img:Harini,
        role:'Designer',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
    {
        name:'Mathan',
        img:Mathan,
        role:'Designer',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
    {
        name:'Mustafa',
        img:Mustafa,
        role:'Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },{
        name:'Varshini',
        img:Varshini,
        role:'Social Media',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
    {
        name:'Irfan',
        img:Irfan,
        role:'Marketing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
    {
        name:'Luqmaan',
        img:Luq,
        role:'Access Control',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eos ratione odio, quam sint suscipit illum debitis optio aliquam ea asperiores modi dolorem nisi exercitationem delectus nemo similique! Illum, nihil?',
        size:30,
        x:180,
        y:210
    },
])
    
    return <div className="members">
            <h2>Meet our Core Members</h2>
        <div className="pics">
            {members.map((member,index)=>{
                return <motion.div key={index}  whileInView={{
                    opacity:1,
                    x:0,
                    y:0
                }} alt="" width={member.width} initial={{
                    x:member.x,
                    y:member.y,
                    margin:20,
                    opacity:0
                }}>
                    <img src={member.img} alt="" />
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </motion.div>
            })}
        </div>
    </div>
}


export default Members