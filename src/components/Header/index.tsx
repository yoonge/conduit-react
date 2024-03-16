import React from 'react'
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import NodeLogo from '../../assets/images/nodejs.ico'
import ReactLogo from '../../assets/images/react.svg'
import './index.less'

import { useAcountStore } from '../../stores/auth'

const Header: React.FC = () => {
  const { user } = useAcountStore()

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
            <Nav.Link href="/">Homepage</Nav.Link>
            {user.username ? (
              <>
                <Nav.Link href="/my-topics">MyTopics</Nav.Link>
                <Nav.Link href="/my-favorites">MyFavorites</Nav.Link>
                <Nav.Link href="/settings">Settings</Nav.Link>
              </>
            ) : null}
          </Nav>
          <Nav className="d-flex login">
            {user.username ? (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link}>
                  <img
                    alt="Avatar"
                    title="Yoonge"
                    src={ReactLogo}
                    className="avatar"
                    width="24"
                    height="24"
                  />
                  Yoonge
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/my-topics">MyTopics</Dropdown.Item>
                  <Dropdown.Item href="/my-favorites">MyFavorites</Dropdown.Item>
                  <Dropdown.Item href="/topic/initiate">New Topic</Dropdown.Item>
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
