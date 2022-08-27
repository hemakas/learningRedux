import EventsList from './features/event/eventList'
import AddEvent from './features/event/addEvent'
import SingleEventPage from './features/event/singleEventPage'
import EditEvent from './features/event/editEvent'
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

          {/* /event/edit/:id - lands on edit event form */}
          <Route path='edit/:eventId' element={<EditEvent />}/>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
