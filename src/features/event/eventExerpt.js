import EventAssignee from "./eventAssignee";
import { Link } from 'react-router-dom'

const EventExerpt = ({ event, index }) => {
  return (
    <article key={event.id}>
        <h3>{index}</h3>
        <h3>{event.title}</h3>
        <p>{event.body}</p>
        <Link to={`event/${event.id}`}><i><u>View Event</u></i></Link>
        <p>{event.start} | {event.end}</p>
        <p><EventAssignee userId={event.userId} /></p>
    </article>
  )
}

export default EventExerpt