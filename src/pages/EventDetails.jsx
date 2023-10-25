import Header from '../components/header'
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RSVP from '../components/rsvp'
const EventDetails = () => {
    const {id} = useParams()

    const event = useSelector((state) => state.card.event)
    const details = event.find((data) => data.id === id)
    const{
 eventName, imageEvent, cityEvent,descEvent
    } = details
  return (
<>

<Header/>
    <div className="container mx-auto p-10">
        <img className='mx-auto w-2/12 rounded-md shadow-md ' src={imageEvent} alt={eventName}/>
        <p className="text-4xl font-bold my-5">{eventName}</p>
        <p className="text-md text-gray-700 mb-5">{cityEvent}</p>
        <p className="text-xl font-regular">{descEvent}</p>
    </div>
<RSVP/>
</>
    )
}

export default EventDetails