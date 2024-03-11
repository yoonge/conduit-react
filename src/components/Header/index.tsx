import React from 'react'
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import ViteLogo from '../../assets/vite.svg'
import ReactLogo from '../../assets/react.svg'
import './index.less'

const Header: React.FC = () => {
  return (
    <Navbar expand="lg" className="header bg-body-tertiary">
       {/* bg="dark" data-bs-theme="dark" */}
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            title="Vite.js"
            src={ViteLogo}
            className="d-inline-block align-top"
            width="32"
            height="32"
          />
          Conduit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Homepage</Nav.Link>
            <Nav.Link href="/my-topics">MyTopics</Nav.Link>
            <Nav.Link href="/my-favorites">MyFavorites</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
          <Nav className="d-flex login">
            <Nav.Link href="/login">Sign in</Nav.Link>
            <Nav.Link href="/register">Sign up</Nav.Link>
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
            {/* <NavDropdown title="Yoonge" id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/my-topics">MyTopics</NavDropdown.Item>
              <NavDropdown.Item href="/my-favorites">MyFavorites</NavDropdown.Item>
              <NavDropdown.Item href="/topic/initiate">New Topic</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
