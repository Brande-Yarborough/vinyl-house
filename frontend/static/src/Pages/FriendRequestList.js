import { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";

function FriendRequests(props) {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    const response = await fetch("/api_v1/friend_requests/");
    const data = await response.json();
    setFriendRequests(data);
    console.log(data);
  };
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
    fetchFriendRequests();
    props.getMyProfile();
  };

  ////REJECT FRIEND REQUEST/////
  const handleRejectFriendRequest = async (friendRequestId) => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendRequestId }),
    };

    const response = await fetch(
      `/api_v1/reject_friend_request/${friendRequestId}/`,
      options
    ).catch(handleError);

    if (!response.ok) {
      throw new Error("Failed to reject friend request");
    }

    const data = await response.json();
    console.log("Friend request rejected:", data);
    fetchFriendRequests();
  };

  const friendRequestsList = friendRequests.map((request) => (
    <Card
      className="friend-request-card"
      style={{ width: "18rem" }}
      key={request.id}
    >
      <Card.Body>
        <div className="member-name-avatar">
          <Card.Text>{request.from_user}</Card.Text>
          <Image
            src={request.from_user_image}
            className="rounded-circle member-photo"
          />
        </div>
        <Button
          className="accept-friend-request-button"
          variant="primary"
          type="button"
          onClick={() => handleAcceptFriendRequest(request.id)}
        >
          Accept
        </Button>
        <Button
          className="reject-friend-request-button"
          onClick={() => handleRejectFriendRequest(request.id)}
        >
          Reject
        </Button>
      </Card.Body>
    </Card>
  ));

  return <div>{friendRequestsList}</div>;
}

export default FriendRequests;
