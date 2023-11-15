import '../styles/DevDetails.css'
import { Close } from '@mui/icons-material'
import { ArrowUpward } from '@mui/icons-material'

const DevDetails = ()=>{
    return <div className="developer-details">
        <div className="fulldetails">
            <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="nawf-abdullah-69474a225" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/nawf-abdullah-69474a225?trk=profile-badge">Nawf Abdullah</a></div>  
        </div>
        <div className="controls">
            <p>Developer</p>
            <ArrowUpward />
            <Close />
        </div>
    </div>
}

export default DevDetails