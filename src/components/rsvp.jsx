import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {Link} from 'react-router-dom'

const RSVP = () => {
const {id} = useParams()
const event = useSelector((state) => state.card.event)
const data = event.find((data)=> data.id === id)
const {dateEvent, quotaEvent} = data
return (
    <div className="w-full bg-slate-200">

<div className="container mx-auto p-10 flex justify-between items-center">
<p className="text-md text-grey-100">{dateEvent} <span>  </span>RSVP Now: <span className="font-bold">
{quotaEvent}
</span><span> </span>
 participan</p>
<Link to="/form-reservation"  className="text-white tracking-widest  uppercase  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" >RSVP</Link>
</div>
    </div>
  )
}

export default RSVP