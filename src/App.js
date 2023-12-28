
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DevDetails from './components/Dev-Details';
import { Route, Routes } from 'react-router-dom';
import Event from './pages/Event';
import Registration from './pages/Registration';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/event/:eventId' element={<Event />} />
          <Route path='/register/:eventId' element={<Registration />}/>
        </Routes>

        
      </div>
    </div>
  );
}

export default App;
