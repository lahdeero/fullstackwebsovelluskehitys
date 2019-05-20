import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { logoutAction } from '../reducers/userReducer'
import { Badge, Button, NavItem, Navbar, NavbarBrand, Nav } from 'reactstrap'
import { Link } from 'react-router-dom'

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
            <Link to="/">Blogs</Link>&nbsp;
          </NavItem>
          <NavItem>
            <Link to="/users">Users</Link>&nbsp;&nbsp;
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

