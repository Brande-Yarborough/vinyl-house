import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const INITIAL_STATE = {
  username: "",
  password1: "",
  password2: "",
  email: "",
};

function RegistrationForm(props) {
  const [state, setState] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    if (state.password1 !== state.password2) {
      setError("Passwords do not match!");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state), //state is object that has all properties to send up on post request: name, email, pass
    };
    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json(); //when we login and are registered we get key
    Cookies.set("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
    //when logout, need to remove cookie
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
            <div style={{ color: "red" }}>{error}</div>
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
    </>
  );
}

export default RegistrationForm;
