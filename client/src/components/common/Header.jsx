import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo4.avif";
import { useClerk, useUser } from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'

function Header() {
  const { signOut } = useClerk()
  const { isSignedIn, user, isLoaded } = useUser()
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)
  const navigate = useNavigate();


  //function to signout
  async function handleSignout() {
    await signOut();
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <div>
      <nav className="header   d-flex justify-content-between align-content-center py-3">
        <div className="d-flex justify-content-center">
          <Link href="/">
            <img src={logo} alt="" width="60px" className="ms-4" />
          </Link>
        </div>
        <ul className="text-white d-flex justify-content-center  list-unstyled">

          {
            !isSignedIn ?
              <>
                <li>
                  <Link to='' className=" link me-4 ">Home</Link>
                </li>
                <li>
                  <Link to='signin' className=" link me-4 ">Signin</Link>
                </li>
                <li>
                  <Link to='signup' className=" link me-4 ">Signup</Link>
                </li>
              </> :
              <div className='user-button'>
                <div style={{ position: 'relative' }}>
                  <img src={user.imageUrl} width='40px' className='rounded-circle' alt="" />
                  <p className='role' style={{ position: 'absolute', top: "0px", right: "-20px" }}>{currentUser.role}</p>
                </div>
                <p className='mb-0 user-name' >{user.firstName}</p>
                <button className="btn btn-danger signout-btn" onClick={handleSignout}>Signout</button>
              </div>
          }

        </ul>
      </nav>
    </div>
  )
}

export default Header