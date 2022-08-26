import UsersList from './features/user/userList'
import AddUser from './features/user/addUser'
import EventsList from './features/event/eventList'
import AddEvent from './features/event/addEvent'

import SingleEventPage from './features/event/singleEventPage'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* / - index page */}
        <Route index element={<EventsList />} />

        <Route path='event'>
          {/* /event - lands on crate event page */}
          <Route index element={<AddEvent />} />
          
          {/* /event/:id - lands on a single event */}
          <Route path=':eventId' element={<SingleEventPage />}/>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
