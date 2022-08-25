import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventAdded } from './eventSlice'
import { selectAllUsers } from '../user/userSlice'

const AddEvent = () => {

  const dispatch = useDispatch()

  const[title, setTitle] = useState('')
  const[content, setContent] = useState('')
  const[start, setStart] = useState(new Date().toISOString())
  const[end, setEnd] = useState(new Date().toISOString())
  const[userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)

  const onTitleChange = e => setTitle(e.target.value)
  const onContentChange = e => setContent(e.target.value)
  const onStartChange = e => setStart(e.target.value)
  const onEndChange = e => setEnd(e.target.value)
  const onAssigneeChange = e => setUserId(e.target.value)

  const OnSubmit = () => {
    if (title && content) {

      dispatch (
        eventAdded ( title, content, start, end, userId )
      )

      setTitle('')
      setContent('')
      setStart(new Date().toISOString())
      setEnd(new Date().toISOString())
      setUserId('')
    }
  }

  // render user names 
  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>{user.name}</option>
  ))

  //   enable or disable submit button
  const canSumbmit = Boolean(title) && Boolean(userId)

  return (
    <section>
        <h2>Add a new user</h2>
        <form>
            <label htmlFor='title'>Title: </label>
            <input type='text' id='title' value={title} onChange={onTitleChange}></input>
            <br></br>
            
            <label htmlFor='content'>Content: </label>
            <input type='text' id='content' value={content} onChange={onContentChange}></input>
            <br></br>
            
            {/* user names */}
            <label htmlFor='assignee'>Assignee: </label>
            <select id='assignee' value={userId} onChange={onAssigneeChange}>
                <option value=''></option>
                {usersOptions}
            </select>
            <br></br>

            <button type='button' onClick={OnSubmit} disabled={!canSumbmit}>Submit</button>
        </form>
    </section>
  )
}

export default AddEvent