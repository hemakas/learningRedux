import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice";

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderUsers = users.map(user => (
    <article key={user.id}>
        <h3><span>({user.id})</span> {user.name}</h3>
        <p>{user.email}</p>
    </article>
  ))
  
  return (
    <section>
      <h1>All Users</h1>
      <hr></hr>
      {renderUsers}
    </section>
  )
}

export default UsersList