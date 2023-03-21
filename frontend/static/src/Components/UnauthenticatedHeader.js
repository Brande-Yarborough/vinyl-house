import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const UnauthenticatedHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg">
        <div id="logo">
          <img id="logo" src={logo} alt="My Logo" />
        </div>
        <Navbar.Brand className="app-header" onClick={() => navigate("/login")}>
          Vinyl House
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <ul className="nav d-flex align-items-center" id="main-nav">
              <li className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default UnauthenticatedHeader;
