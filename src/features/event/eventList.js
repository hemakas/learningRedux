import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, getEventError, getEventStatus, selectAllEvents } from "./eventSlice";
import EventExerpt from "./eventExerpt";
import { useEffect } from "react";

const EventsList = () => {
  const dispatch = useDispatch()

  const events = useSelector(selectAllEvents)
  const eventStatus = useSelector(getEventStatus)
  const error = useSelector(getEventError)

  useEffect(() => {
    if (eventStatus === 'idle') {
      dispatch(fetchEvents())
    }
  }, [eventStatus, dispatch])

  let content

  if (eventStatus === 'loading') {
    // show loading
    content = <p>"Loading..."</p>
  } else if (eventStatus === 'succeeded') {
    // show content
    content = events.map(event => <EventExerpt key={event.id} event={event} /> )
  } else if (eventStatus === 'failed') {
    // show error message
    content = <p>{error}</p>
  }
  
  return (
    <section>
      <h1>All Events</h1>
      <hr></hr>
      
      {/* render fetched content */}
      {content}
    </section>
  )
}

export default EventsList