import '../index.css'
const Notification = ({message})=>{

    if(message.includes('Added')){

    return <h2 className="positiveNotification">{message}</h2>

    }
    else if(message.includes('removed')){
        
         return <h2 className="negativeNotification">{message}</h2>


    }

    
    
    return
    
    


}
export default Notification