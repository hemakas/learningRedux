import { useSelector } from "react-redux"
import { selectAllUsers } from "../user/userSlice"

const EventAssignee = ({ userId }) => {
  const users = useSelector(selectAllUsers)
  const assignee = users.find(user => user.id === userId)
  
    return (
    <span>Assigned to {assignee ? assignee.name : 'Not assigned'}</span>
  )
}

export default EventAssignee