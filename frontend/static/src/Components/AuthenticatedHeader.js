import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";

const AuthenticatedHeader = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#my-albums">My Albums</Nav.Link>
          <Nav.Link href="#my-friends">My Friends</Nav.Link>
          <Button onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthenticatedHeader;
