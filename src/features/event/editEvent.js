import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectEventById, updateEvent } from './eventSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { selectAllUsers } from '../user/userSlice'

import React from 'react'

const EditEvent = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    // event to edit
    const event = useSelector((state) => selectEventById(state, Number(eventId)))

    // get all assignees
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(event?.title)
    const [content, setContent] = useState(event?.body)
    const [start, setStart] = useState(event?.start)
    const [end, setEnd] = useState(event?.end)
    const [userId, setUserId] = useState(event?.userId)

    const [addReqestStatus, setAddReqestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!event) {
        return (
            <section>
                <h2>Event not found!</h2>
            </section>
        )
    }

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onStartChange = e => setStart(e.target.value)
    const onEndChange = e => setEnd(e.target.value)
    const onAssigneeChange = e => setUserId(e.target.value)

    // enable or disable submit button
    const canSumbmit = [title, content, userId].every(Boolean) && addReqestStatus === 'idle'

    // submit form data
    const OnSubmit = () => {
        if (canSumbmit) {
            try {
                setAddReqestStatus('pending')

                dispatch (updateEvent ({
                    id: event.id,
                    title,
                    body: content,
                    start,
                    end,
                    userId
                })).unwrap()

                setTitle('')
                setContent('')
                setStart(new Date().toISOString())
                setEnd(new Date().toISOString())

                // navigate user to the edited event
                navigate(`/event/${eventId}`)

            } catch (error) {
                console.log('Failed to save the post', error)
            } finally {
                setAddReqestStatus('idle')
            }
        }
    }

    // render user names 
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    // render event add form with data
    return (
        <section className="container card-3">
            <h2>Add a new user</h2>
            <form>
                <label htmlFor='title'>Title: </label>
                <input type='text' id='title' value={title} onChange={onTitleChange}></input>
                <br></br>
                
                <label htmlFor='content'>Content: </label>
                <textarea id='content' value={content} onChange={onContentChange} rows={8}/>
                <br></br>
                
                {/* user names */}
                <label htmlFor='assignee'>Assignee: </label>
                <select id='assignee' defaultValue={userId} onChange={onAssigneeChange}>
                    <option value=''></option>
                    {usersOptions}
                </select>
                <br></br>
    
                <button type='button' onClick={OnSubmit} disabled={!canSumbmit}>Submit</button>
            </form>
        </section>
      )
  
  
  
}

export default EditEvent