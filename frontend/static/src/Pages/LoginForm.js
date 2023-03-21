import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [state, setState] = useState(INITIAL_STATE);

  const handleInput = (e) => {
    const { name, value } = e.target; //value of this inside event listener is event.target, value of this in fat arrow is LoginForm
    setState((prevState) => ({
      //previous changes to state will be executed in correct order, that is why we use function here
      //go get previous object, and now I'm going to update it
      //you would lose other properties if didn't spread out prevState
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //submit the state data
    console.log(state);
    login(state);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div id="background-image">
        <Container id="login-container">
          <h1 className="welcome">Welcome to Vinyl House</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={state.username}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={state.email}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={state.password}
                onChange={handleInput}
              />
            </Form.Group>

            <Button id="login-form" variant="primary" type="submit">
              Login
            </Button>

            <p id="register-link">
              Don't have an account? Click
              <NavLink id="register-here" to="/register">
                here
              </NavLink>
              to register.
            </p>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
