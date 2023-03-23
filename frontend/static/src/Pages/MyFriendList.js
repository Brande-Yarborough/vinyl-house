import { useState, useEffect } from "react";
import { Container, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";
import FriendRequests from "./FriendRequestList";
import { FaTrash } from "react-icons/fa";

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
    getMyProfile();
  };

  /////Friend List/////
  console.log("PROFILE FRIENDS", profile.friends);

  const myFriendListHTML = profile.friends?.map((friend) => (
    <Card
      className="friend-list-card"
      key={friend.id}
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <div className="member-name-avatar">
          <Card.Text>{friend.username}</Card.Text>
          <Image
            src={friend.profile_avatar}
            className="rounded-circle member-photo"
          />
        </div>

        <div className="friend-list-buttons">
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
            <FaTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>
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
    <Card
      className="vinyl-house-members-card"
      key={profile.id}
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <div className="member-name-avatar">
          <Card.Text>{profile.display_name}</Card.Text>
          <Image src={profile.avatar} className="rounded-circle member-photo" />
        </div>
        <Button
          variant="primary"
          type="button"
          onClick={() => handleSendFriendRequest(profile.user.id)}
        >
          Send Friend Request
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <div id="friend-background-image">
      <Container id="friend-main-container">
        <div className="col" id="friend-list-container">
          <h2 id="my-friends-header">My Friends</h2>
          <div className="friend-list-row row-12 row-md my-friends">
            {myFriendListHTML}
          </div>
          <h2 id="friend-requests">Friend Requests</h2>
          <div className="friend-list-row row-12 row-md friend-request">
            <FriendRequests getMyProfile={getMyProfile} />
          </div>
          <h2 id="vinyl-house-members">Vinyl House Members</h2>
          <div className="friend-list-row row-12 row-md house-members">
            {profileListHTML}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FriendList;
