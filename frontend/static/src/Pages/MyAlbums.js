import { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function MyAlbums() {
  const [myAlbums, setMyAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyAlbums = async () => {
      const response = await fetch(`/api_v1/user/albums/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setMyAlbums(data);
    };
    getMyAlbums();
  }, []);

  const deleteAlbum = async (id) => {
    // const id = event.currentTarget.value;
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(`/api_v1/user/albums/${id}/`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      console.log(response);
      // create shallow copy of albums
      let updatedAlbums = [...myAlbums];
      //find index of album we want to delete
      const index = updatedAlbums.findIndex((x) => x.id == id);
      //removing album from array
      updatedAlbums.splice(index, 1);
      //reset state with updatedAlbums
      setMyAlbums(updatedAlbums);
      console.log(updatedAlbums);
    }
  };

  const MyAlbumListHTML = myAlbums.map((album) => (
    <Container className="d-flex" key={album.album_detail.api_id}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={album.album_detail.cover_image} />
        <Card.Body>
          <Card.Title>{album.album_detail.title}</Card.Title>
          <div id="album-detail-button">
            <Link
              id="album-detail"
              to={`/my-album-detail/${album.id}`}
              type="primary"
            >
              Album Detail
            </Link>
          </div>
          <div>
            <Button type="submit" onClick={() => deleteAlbum(album.id)}>
              Delete Album
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  ));

  return (
    <div>
      {" "}
      <h1>My Albums</h1>
      {MyAlbumListHTML}
    </div>
  );
}

export default MyAlbums;
