import React, {useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import {Container,Navbar ,Nav,NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router'
import {AuthContext} from "./Helper/AuthContext"
const brand = {
    textDecoration:"none",
    color:"black"
}


function NavigationBar() {
    const history = useHistory()
    const {authState,setAuthState} = useContext(AuthContext)



    const logOut = () => {
        sessionStorage.removeItem("accessToken")
        setAuthState(false)
        history.push("/")
    }

    return (
        <div>
            <Navbar bg="light" expand="lg" >
                <Container>
                    <Navbar.Brand><Link style={brand} to="/"><h1>ReGen-Connect</h1></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">

                        {authState ? <div className="navbar-nav m-auto text-center">
                            <Nav.Link><Link style={brand} to="/">Home</Link></Nav.Link>
                            <Nav.Link><Link  style={brand} to="/create">Create a post</Link></Nav.Link>
                            <Nav.Link><Link  style={brand} to="/posts">All posts</Link></Nav.Link>
                            <button onClick={logOut} className="btn btn-success">Log Out</button>
                        </div>:<React.Fragment>
                        <div className="navbar-nav m-auto text-center">
                            <Nav.Link><Link style={brand} to="/">Home</Link></Nav.Link>
                            <Nav.Link disabled><Link  style={brand} to="/create">Create a post</Link></Nav.Link>
                            <Nav.Link disabled><Link  style={brand} to="/posts">All posts</Link></Nav.Link>
                        </div>
                        <NavDropdown title="Sign In" className="text-right p-3 m-auto">
                            <NavDropdown.Item href="/" ><Link  style={brand} to="/login">Login</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link  style={brand} to="/register">Create New Account</Link></NavDropdown.Item>
                        </NavDropdown>
                        </React.Fragment>
                        }
                    </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}

export default NavigationBar
