import './AvatarPicker.css'
import Profile from '../../assets/profile.jpg'
import { useRef, useState } from 'react';

const AvatarPicker = ({setFunction}) => {
    const [image,setImage] = useState(Profile)
    const fileRef = useRef() 

    const convertBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
              reject(error);
            }
          })
    }
    return ( 
        <div className="avatar-picker">
            <img src={image} alt="" className="avatar-pic" onClick={()=>fileRef.current.click()}/>
            <input ref={fileRef} type="file" name="" id="" onChange={ async (event) => {
                const file = event.target.files[0]
                const base64 = await convertBase64(file)
                setImage(base64)
                setFunction(base64)
            }}/>
        </div>
     );
}
 
export default AvatarPicker;