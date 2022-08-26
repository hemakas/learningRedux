import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const EVENTS_URL = 'https://jsonplaceholder.typicode.com/posts'

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

// create new event
export const addNewEvent = createAsyncThunk('events/addNewEvent', async (initialPost) => {
    try {
        const response =  await axios.post(EVENTS_URL, initialPost)
        return response.data
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
            prepare (title, body, start, end, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
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
            .addCase (addNewEvent.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                console.log(action.payload)
                state.events.push(action.payload)
            })
    }
})

export const selectAllEvents = (state) => state.events.events

export const getEventStatus = (state) => state.events.status

export const getEventError = (state) => state.events.error

// find a single event
export const selectEventById = (state, eventId) => state.events.events.find(event => event.id === eventId)

export const { eventAdded } = EventSlice.actions

export default EventSlice.reducer