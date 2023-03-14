import { useState } from "react";
import Cookies from "js-cookie";
import { handleError } from "../utils/utilities";

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

    const response = await fetch("/api_v1/accounts/profiles/", options).catch(
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
    <form>
      <div>
        <input type="file" onChange={handleImage} />
      </div>
      <div>
        <label htmlFor="display-name">
          Display Name:
          <input type="text" value={displayName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label htmlFor="genre">
          Favorite Genre:
          <input type="text" value={favoriteGenre} onChange={handleChange} />
        </label>
      </div>
      {!profile.id ? (
        <button type="button" onClick={handleCreate}>
          Create Profile
        </button>
      ) : (
        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      )}
    </form>
  );
}

export default ProfileForm;
