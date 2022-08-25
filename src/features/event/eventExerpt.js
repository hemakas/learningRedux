import EventAssignee from "./eventAssignee";

const eventExerpt = ({ event }) => {
  return (
    <article key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.content}</p>
        <p>{event.start} | {event.end}</p>
        <p><EventAssignee userId={event.userId} /></p>
    </article>
  )
}

export default eventExerpt