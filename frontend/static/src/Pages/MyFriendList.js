import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";

function FriendList() {
  const [profile, setProfile] = useState({});
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    getMyProfile();
  }, []);
  //for page re-render to load after editing fields
  const getMyProfile = async () => {
    const response = await fetch(`/api_v1/profiles/current_user/`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    setProfile(data);
  };

  /////Friend List/////
  console.log({ profile });

  const myFriendListHTML = profile.friends?.map((friend) => (
    <Container>
      <h1>My Friends</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>{friend.username}</Card.Text>
          <Link to={`/friend-albums/${friend.id}`} type="primary">
            View Albums
          </Link>
        </Card.Body>
      </Card>
    </Container>
  ));

  /////Get User Profiles for Friend Request/////
  useEffect(() => {
    getProfileList();
  }, []);
  const getProfileList = async () => {
    const response = await fetch(`/api_v1/profiles/`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    setProfileList(data);
  };

  /////SEND FRIEND REQUEST/////
  const handleSendFriendRequest = async (profileID) => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileID }),
    };

    const response = await fetch(
      `/api_v1/send_friend_request/${profileID}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Failed to send friend request");
    }
    const data = await response.json();
    console.log("Friend request sent:", data);
  };

  const profileListHTML = profileList.map((profile) => (
    <Container key={profile.id}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>{profile.display_name}</Card.Text>
          <Button
            variant="primary"
            type="button"
            onClick={() => handleSendFriendRequest(profile.id)}
          >
            Send Friend Request
          </Button>
        </Card.Body>
      </Card>
    </Container>
  ));

  /////ACCEPT FRIEND REQUEST/////
  const handleAcceptFriendRequest = async (requestID) => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestID }),
    };

    const response = await fetch(
      `/api_v1/accept_friend_request/${requestID}/`,
      options
    ).catch(handleError);

    if (!response.ok) {
      throw new Error("Failed to accept friend request");
    }

    const data = await response.json();
    console.log("Friend request accepted:", data);
  };

  return (
    <>
      <Container>
        <div>{myFriendListHTML}</div>
        <div>
          <h1>Vinyl House Members</h1>
          {profileListHTML}
        </div>
      </Container>
    </>
  );
}

export default FriendList;
