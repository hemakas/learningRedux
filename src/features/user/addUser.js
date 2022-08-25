import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userAdded } from './userSlice'

const AddUser = () => {

  const dispatch = useDispatch()

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')

  const onNameChange = e => setName(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)

  // enable or disable submit button
  const canSumbmit = Boolean(name) && Boolean(email)

  const OnSubmit = () => {
    if (name && email) {
      dispatch (
        userAdded ( name, email )
      )

      setName('')
      setEmail('')
    }
  }

  return (
    <section>
        <h2>Add New User</h2>
        <hr></hr>
        <form>
          <label htmlFor='name'>Name: </label>
          <input type='text' id='name' value={name} onChange={onNameChange}></input>
          <br></br>

          <label htmlFor='email'>Email: </label>
          <input type='text' id='email' value={email} onChange={onEmailChange}></input>
          <br></br> 

          <button type='button' onClick={OnSubmit} disabled={!canSumbmit}>Submit</button>
        </form>
        <hr></hr>
        <hr></hr>
    </section>
  )
}

export default AddUser