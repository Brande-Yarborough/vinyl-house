import { useState } from "react";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";
import { Container, Form, Button } from "react-bootstrap";

function ProfileForm() {
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    }
    formData.append("display_name", displayName);
    formData.append("favorite_genre", favoriteGenre);

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

  const handleUpdate = async (event) => {
    const formData = new FormData();

    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    }
    formData.append("display_name", displayName);
    formData.append("favorite_genre", favoriteGenre);

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

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Upload Profile Image</Form.Label>
          <Form.Control name="image" type="file" onChange={handleImage} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label htmlFor="display_name" />
          Display Name:
          <Form.Control
            name="display-name"
            placeholder="Enter display name"
            type="text"
            value={displayName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="favorite_genre" />
          Favorite Genre:
          <Form.Control
            name="favorite-genre"
            placeholder="Enter favorite genre"
            type="text"
            value={favoriteGenre}
            onChange={handleChange}
          />
        </Form.Group>
        {!profile.id ? (
          <Button type="submit" onClick={handleCreate}>
            Create Profile
          </Button>
        ) : (
          <Button type="submit" onClick={handleUpdate}>
            Update Profile
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default ProfileForm;
