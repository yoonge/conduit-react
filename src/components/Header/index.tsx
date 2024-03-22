import React from 'react'
import { redirect, useLocation } from 'react-router-dom'
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { BASE_URL } from '../../constants/settiings'
import NodeLogo from '../../assets/images/nodejs.ico'
import './index.less'

import { useAcountStore } from '../../stores/auth'

const Header: React.FC = () => {
  const { user, logout } = useAcountStore()
  const { pathname = '/' } = useLocation()

  const handleLogout = () => {
    logout()
    redirect('/login')
  }

  return (
    <Navbar expand="lg" className="header bg-body-tertiary">
       {/* bg="dark" data-bs-theme="dark" */}
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            title="Vite.js"
            src={NodeLogo}
            className="d-inline-block"
            width="30"
            height="30"
          />
          CONDUIT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={pathname === "/" ? "me-1 active" : "me-1"}>Homepage</Nav.Link>
            {user.username ? (
              <Nav.Link href="/settings" className={pathname === "/settings" ? "active" : ""}>Settings</Nav.Link>
            ) : null}
          </Nav>
          <Nav className="d-flex login">
            {user.username ? (
              <Dropdown as={Nav.Item} align="end">
                <Dropdown.Toggle as={Nav.Link} className="px-0">
                  <img
                    alt="Avatar"
                    title="Yoonge"
                    src={`${BASE_URL}${user.avatar}`}
                    className="avatar"
                    width="24"
                    height="24"
                  />
                  {user.nickname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/topic/initiate">New Topic</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as="button" className="logout" onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button href="/login" variant="outline-dark">Sign in</Button>
                <Button href="/register" variant="dark">Sign up</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
