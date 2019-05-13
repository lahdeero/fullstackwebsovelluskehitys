import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { logoutAction } from '../reducers/userReducer'
import { Badge, Button, NavLink, NavItem, Navbar, NavbarBrand, Nav } from 'reactstrap'

const Menu = (props) => {
  const handleLogout = () => {
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    props.logoutAction()
  }

  return (
    <div>
      <Navbar color="light" expand="md">
        <NavbarBrand href="/">blog app</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Blogs</NavLink>&nbsp;
          </NavItem>
          <NavItem>
            <NavLink href="/users">Users</NavLink>&nbsp;
          </NavItem>
          <NavItem>
            <Badge>{props.user && props.user.name && `${props.user.username} logged in`}</Badge>
            <Button color="danger" onClick={handleLogout}>logout</Button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  logoutAction
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default ConnectedMenu

