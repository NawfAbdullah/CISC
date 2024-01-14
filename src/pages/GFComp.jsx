import Button from "../components/Buttons/Button";

const GFComp = () => {

    const listStyle = {
        listStyle:'none',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start'
    }
    return <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh'
    }}>
            <ul>
                <li style={listStyle} ><p>Register as a package </p><Button handleClick={()=>window.location.href = "https://forms.gle/bsHpJitzWDH3ynCw6"}>Click here</Button></li>
                <li style={listStyle}><p>Register for individual event</p><Button handleClick={()=>window.location.href = "https://forms.gle/YfPpXTzXtQjBgg2t8"}> Click here</Button></li>
                <li style={listStyle}><p>Register for 2 day shop (only for crescentians)</p><Button handleClick={()=>window.location.href = "https://forms.gle/2GmpFVoDRArfiHiz8"}>Click here</Button></li>
            </ul>
    </div>;
}
 
export default GFComp;