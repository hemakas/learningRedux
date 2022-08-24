import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', name: 'Steven Gerrard', email: 'steven@gmail.com' },
    { id: '2', name: 'Wayne Rooney', email: 'rooney@gmail.com' },
]

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
    }
})

export const selectAllUsers = (state) => state.users

export const { userAdded } = userSlice.actions

export default UserSlice.reducer