import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    { 
        id: '1', 
        title: 'Meeting with boss', 
        content: 'Sample content 1', 
        start: sub(new Date(), { minutes: 40}).toISOString(), 
        end: sub(new Date(), { minutes: 10}).toISOString(), 
        userId: '' 
    },
    { 
        id: '2', 
        title: 'Go for shopping', 
        content: 'Sample content 2', 
        start: sub(new Date(), { days: 10}).toISOString(),
        end: sub(new Date(), { days: 10, }).toISOString(), 
        userId: '' 
    },
]

export const EventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        eventAdded: {
            reducer (state, action) {
                state.push(action.payload)
            },
            prepare (title, content, start, end, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        start,
                        end,
                        userId
                    }
                }
            }
        }
    }
})

export const selectAllEvents = (state) => state.events

export const { eventAdded } = EventSlice.actions

export default EventSlice.reducer