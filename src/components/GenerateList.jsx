const GenerateList = () => {
    return ( <>    
         {event.competitions.map((content,index)=>{
                    return (
                        <div className="check-container" style={{
                            borderColor:(participant.includes(content._id)||cop.includes(content._id))?'green':'red'
                        }} onClick={()=>{
                            if(id){
                                setComp([])
                                if(participant.includes(content._id)){
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
                                    setComp(prevValue=>prevValue.push(content._id))
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
                            borderColor:(participant.includes(content._id)||cop.includes(content._id))?'green':'red'
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
                                    setComp(prevValue=>prevValue.push(content._id))
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
    </> );
}
 
export default GenerateList;