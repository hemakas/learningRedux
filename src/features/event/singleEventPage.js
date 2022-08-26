import { useSelector } from "react-redux"
import { selectEventById } from "./eventSlice"
import EventAssignee from "./eventAssignee"
import { useParams } from 'react-router-dom'

const SingleEventPage = () => {
    
    // event id from the url
    const { eventId } = useParams()
    // get event from the id
    const event = useSelector((state) => selectEventById(state, Number(eventId)))

    if (!event) {
        return (
            <section>
                <h2>Event not found</h2>
            </section>
        )
    }
 
    return (
        <article key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.content}</p>
        <p>{event.start} | {event.end}</p>
        <p><EventAssignee userId={event.userId} /></p>
    </article>
    )
}

export default SingleEventPage