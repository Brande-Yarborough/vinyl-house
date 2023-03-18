import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
          {/* <Button variant="primary">View Albums</Button> */}
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
  //for page re-render to load after editing fields
  const getProfileList = async () => {
    const response = await fetch(`/api_v1/profiles/`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    setProfileList(data);
  };

  const profileListHTML = profileList.map((profile) => (
    <Container key={profile.id}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>{profile.display_name}</Card.Text>
          <Button variant="primary" type="submit">
            Send Friend Request
          </Button>
        </Card.Body>
      </Card>
    </Container>
  ));

  /////Send Friend Request/////

  // function SendFriendRequestButton(props) {
  //   const [isSending, setIsSending] = useState(false);

  //   function handleSendRequest() {
  //     setIsSending(true);

  //     fetch(`/api_v1/send_friend_request/${props.userId}/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${props.token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setIsSending(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setIsSending(false);
  //       });
  //   }
  // }

  return (
    <>
      <Container>
        <div>{myFriendListHTML}</div>
        <div>
          <h1>Vinyl House Members</h1>
          {profileListHTML}
        </div>

        {/* <div>
          <Button onClick={handleSendRequest} disabled={isSending}>
            {isSending ? "Sending..." : "Send Friend Request"}
          </Button>
        </div> */}
      </Container>
    </>
  );
}

export default FriendList;
