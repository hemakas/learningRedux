import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const EVENTS_URL = 'https://jsonplaceholder.typicode.com/todos'

const initialState = { 
    events: [],
    status: 'idle', // idle || loading || succeeded || failed
    error: null 
}

// fetch from jsonplaceholder api
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    try {
        const response =  await axios.get(EVENTS_URL)
        return [...response.data]
    } catch (error) {
        return error.message
    }
})

export const EventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        eventAdded: {
            reducer (state, action) {
                state.events.push(action.payload)
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
    }, 

    // extra reducer
    extraReducers(builder) {
        builder
            .addCase (fetchEvents.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase (fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded'

                // adding start and end dates
                let day = 1
                const loadedEvents = action.payload.map(event => {
                    event.start = sub(new Date(), { days: day++ }).toISOString()
                    event.end = sub(new Date(), { days: day++ }).toISOString()
                    
                    return event
                })

                state.events = state.events.concat(loadedEvents)

            })
            .addCase (fetchEvents.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllEvents = (state) => state.events.events

export const getEventStatus = (state) => state.events.status

export const getEventError = (state) => state.events.error

export const { eventAdded } = EventSlice.actions

export default EventSlice.reducer