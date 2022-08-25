import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userAdded } from './userSlice'

const AddUser = () => {

  const dispatch = useDispatch()

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')

  const onNameChange = e => setName(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)

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
        <h2>Add a new user</h2>
        <form>
            <label htmlFor='name'>Name: </label>
            <input type='text' id='name' value={name} onChange={onNameChange}></input>
            <br></br>
            <label htmlFor='email'>Email: </label>
            <input type='text' id='email' value={email} onChange={onEmailChange}></input>
            <br></br> 
            <button type='button' onClick={OnSubmit}>Submit</button>
        </form>
    </section>
  )
}

export default AddUser