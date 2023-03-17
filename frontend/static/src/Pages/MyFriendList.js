import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";
import { Container, Form, Button, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function FriendList() {
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  //   const [displayName, setDisplayName] = useState("");
  //   const [favoriteGenre, setFavoriteGenre] = useState("");

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

  const handleCreate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    }
    formData.append("display_name", profile.display_name);
    formData.append("favorite_genre", profile.favorite_genre);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api_v1/profiles/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not ok");
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    if (profile.avatar instanceof File) {
      formData.append("avatar", profile.avatar);
    }
    formData.append("display_name", profile.display_name);
    formData.append("favorite_genre", profile.favorite_genre);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/profiles/${profile.id}/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not ok");
    }
    const data = await response.json();
    getMyProfile();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProfile({
      ...profile,
      avatar: file,
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
  };
  /////Friend List/////
  console.log({ profile });

  const myFriendListHTML = profile.friends?.map((friend) => (
    <Container>
      <div>My Friends:</div>
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

  return (
    <>
      <div>{myFriendListHTML}</div>
    </>
  );
}

export default FriendList;
