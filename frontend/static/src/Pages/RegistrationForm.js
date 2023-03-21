import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { AuthContext } from "../context/AuthContext";

const INITIAL_STATE = {
  username: "",
  password1: "",
  password2: "",
  email: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useContext(AuthContext);
  const [state, setState] = useState(INITIAL_STATE);
  const [passwordMatch, setPasswordMatch] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.password1 === state.password2) {
      //submit the state data
      register(state);
      console.log(state);
    } else {
      setPasswordMatch(false);
    }
  };

  if (isAuthenticated) {
    <Navigate to="/profile" />;
  }

  return (
    <>
      <div id="background-image">
        <Container id="register-container">
          <h1 className="welcome">Welcome to Vinyl House</h1>
          <Form id="register" onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password1"
                value={state.password1}
                onChange={handleInput}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify password"
                name="password2"
                value={state.password2}
                onChange={handleInput}
                required
              />
              {!passwordMatch && (
                <Form.Text className="text-danger">
                  Passwords do not match
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                //   id="email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={state.email}
                onChange={handleInput}
              />
            </Form.Group>

            <Button className="register-button" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Register;
