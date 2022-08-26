import EventAssignee from "./eventAssignee";
import { Link } from 'react-router-dom'

const EventExerpt = ({ event, index }) => {
  return (
    <article className="card card-1" key={event.id}>
        <h3>{index}</h3>
        <h2 className="card__title">{event.title.substring(0, 35)}...</h2>
        <p className="card__body">{event.body.substring(0, 75)}...</p>

        <p className="card__apply">
          <Link to={`event/${event.id}`}><span className="card__link">View Event</span></Link>
        </p>
        
        <p className="card__body">{event.start} | {event.end}</p>
        <p><EventAssignee userId={event.userId} /></p>
    </article>
  )
}

export default EventExerpt