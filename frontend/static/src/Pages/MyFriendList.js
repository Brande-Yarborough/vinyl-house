import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";
import FriendRequests from "./FriendRequestList";

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

  /////REMOVE FRIEND/////
  //need to use the correct ID currently using USER ID...need to use PROFILE ID
  const handleRemoveFriend = async (friendId) => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api_v1/remove_friend/${friendId}/`, options);
    if (!response.ok) {
      throw new Error("Failed to remove friend");
    }

    // Update the friend list
    const updatedProfile = await response.json();
    setProfile(updatedProfile);
  };

  /////Friend List/////
  console.log("PROFILE FRIENDS", profile.friends);

  const myFriendListHTML = profile.friends?.map((friend) => (
    <Container>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>{friend.username}</Card.Text>
          <Link
            id="friend-albums"
            to={`/friend-albums/${friend.id}`}
            type="primary"
          >
            View Albums
          </Link>
          <Button
            variant="primary"
            type="button"
            onClick={() => handleRemoveFriend(friend.profile_id)}
          >
            Remove Friend
          </Button>
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
    console.log("User Profiles", data);
  };

  /////SEND FRIEND REQUEST/////
  const handleSendFriendRequest = async (profileUserID) => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileUserID }),
    };

    const response = await fetch(
      `/api_v1/send_friend_request/${profileUserID}/`,
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
            onClick={() => handleSendFriendRequest(profile.user.id)}
          >
            Send Friend Request
          </Button>
        </Card.Body>
      </Card>
    </Container>
  ));

  return (
    <>
      <Container>
        <h1>My Friends</h1>
        <div className="row">
          <div className="col">{myFriendListHTML}</div>

          <div className="col">
            <h1>Vinyl House Members</h1>
            {profileListHTML}
          </div>

          <h1>Friend Requests</h1>
          {/* <div className="row"> */}
          <div className="col">
            <FriendRequests />
          </div>
        </div>
        {/* </div> */}
      </Container>
    </>
  );
}

export default FriendList;
