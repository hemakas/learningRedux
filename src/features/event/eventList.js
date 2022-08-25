import { useSelector } from "react-redux";
import { selectAllEvents } from "./eventSlice";
import EventAssignee from "./eventAssignee";


const EventsList = () => {
  const events = useSelector(selectAllEvents)

  // const orderedEvents = events.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderEvents = events.map(event => (
    <article key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.content}</p>
        <p>{event.start} | {event.end}</p>
        <p><EventAssignee userId={event.userId} /></p>
    </article>
  ))
  
  return (
    <section>
      <h1>Event</h1>
      <hr></hr>
      {renderEvents}
    </section>
  )
}

export default EventsList