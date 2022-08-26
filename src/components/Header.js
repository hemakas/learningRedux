import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navMenu">
        <Link to="/">Home</Link>
        <Link to="event">Events</Link> 
      <div className="dot"></div>
    </nav>
  )
}

export default Header