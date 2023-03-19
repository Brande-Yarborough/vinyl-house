import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";
import { Container, Form, Button, Image, Card } from "react-bootstrap";

function ProfileForm() {
  const [profile, setProfile] = useState({});

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
    if (profile.avatar instanceof File) {
      formData.append("avatar", profile.avatar);
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
    ////recall getMyProfile to re-render page so profile info updates////
    getMyProfile();
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
    console.log("Avatar", profile.avatar);
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicImage">
            {/* <Form.Label>Upload Profile Image</Form.Label>
          <Form.Control name="avatar" type="file" onChange={handleImage} /> */}
            <div className="avatar-container">
              <Image
                id="avatar"
                src={profile.avatar}
                // style={{ width: "35%" }}
              />
            </div>
            <Form.Control name="avatar" type="file" onChange={handleImage} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label />
            Display Name:
            <Form.Control
              name="display_name"
              placeholder="Enter display name"
              type="text"
              value={profile.display_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label />
            Favorite Genre:
            <Form.Control
              name="favorite_genre"
              placeholder="Enter favorite genre"
              type="text"
              value={profile.favorite_genre}
              onChange={handleChange}
            />
          </Form.Group>
          {!profile.id ? (
            <Button type="submit" onClick={handleCreate}>
              Create Profile
            </Button>
          ) : (
            <Button type="button" onClick={handleUpdate}>
              Update Profile
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
}

export default ProfileForm;
