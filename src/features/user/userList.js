import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice";

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderUsers = users.map(user => (
    <article key={user.id}>
        <h3>{user.name}</h3>
        <h5>{user.email}</h5>
    </article>
  ))
  
  return (
    <section>
      <h1>Users</h1>
      {renderUsers}
    </section>
  )
}

export default UsersList