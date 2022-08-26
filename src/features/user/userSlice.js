import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

// fetch from jsonplaceholder api
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response =  await axios.get(USERS_URL)
        return [...response.data]
    } catch (error) {
        return error.message
    }
})

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userAdded: {
            reducer (state, action) {
                state.push(action.payload)
            },
            prepare (name, email) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        email
                    }
                }
            }
        }
    }, extraReducers(builder) {
        builder.addCase (fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users

export const { userAdded } = UserSlice.actions

export default UserSlice.reducer