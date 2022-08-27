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
export const addNewEvent = createAsyncThunk('events/addNewEvent', async (initialEvent) => {
    try {
        const response =  await axios.post(EVENTS_URL, initialEvent)
        return response.data
    } catch (error) {
        return error.message
    }
})

// upate event
export const updateEvent = createAsyncThunk('events/updateEvent', async (initialEvent) => {
    // get id of the event to be updated
    const { id } = initialEvent
    
    try {
        // update event
        const response =  await axios.put(`${EVENTS_URL}/${id}`, initialEvent)
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
            // fetch all events - loading
            .addCase (fetchEvents.pending, (state, action) => {
                state.status = 'loading'
            })
            // fetch all events - if scceeded
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
            // fetch all events - if failed
            .addCase (fetchEvents.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // add new event
            .addCase (addNewEvent.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                console.log(action.payload)
                state.events.push(action.payload)
            })
            // update event
            .addCase (updateEvent.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return
                }

                const { id } = action.payload

                const { userId } = action.payload
                console.log(userId)
                
                // add new start and end dates
                let day = 1
                action.payload.start = sub(new Date(), { days: day++ }).toISOString()
                action.payload.end = sub(new Date(), { days: day++ }).toISOString()

                // filter out the event to be edited
                const event = state.events.filter(event => event.id !== id)

                // insert the updated event into the events array
                state.events = [...event, action.payload]
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