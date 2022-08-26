import UsersList from './features/user/userList'
import AddUser from './features/user/addUser';
import EventsList from './features/event/eventList';
import AddEvent from './features/event/addEvent';

function App() {
  return (
    <div>
      <h1>Redux App</h1>
      <UsersList />
      <AddUser />

      <hr></hr>

      <EventsList />
      <AddEvent />
    </div>
  );
}

export default App;
