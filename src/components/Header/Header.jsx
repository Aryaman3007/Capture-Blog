import React from 'react'
import Container from "../container/Container"
import Logo from "../Logo"
import LogoutButton from "./LogoutButton"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 bg-orange-100 border border-b-gray-400 sticky top-0'>
      <Container>
        <nav className='flex'>
          <div className='flex justify-center items-center'>
            <Link to='/'>
              <Logo width='130px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ?
                (<li key={item.name} className='font-semibold text-xl'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:text-orange-800'>
                    {item.name}
                  </button>
                </li>)
                : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header