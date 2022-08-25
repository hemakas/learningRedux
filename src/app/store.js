import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/user/userSlice'
import eventsReducer from '../features/event/eventSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    events: eventsReducer
  },
})