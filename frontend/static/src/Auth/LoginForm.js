import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};

function LoginForm(props) {
  const navigate = useNavigate();
  const [setAuth, setUser] = useOutletContext();
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
  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state), //state is object that has all properties to send up on post request: name, email, pass
    };
    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json(); //when we login and are registered we get key
    Cookies.set("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
    //when logout, need to remove cookie
    // props.setPage("articles");
    setAuth(true);
    setUser({ username: data.username });
    // setUser(data.)
    navigate("/");
  };

  return (
    <>
      <Container>
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
    </>
  );
}

export default LoginForm;
