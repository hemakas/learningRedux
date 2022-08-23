import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', name: 'Steven Gerrard', email: 'steven@gmail.com' },
    { id: '2', name: 'Wayne Rooney', email: 'rooney@gmail.com' },
]

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users

export default userSlice.reducer