import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaTrash } from "react-icons/fa";

function MyAlbums() {
  const [myAlbums, setMyAlbums] = useState(null);
  const navigate = useNavigate();
  //To display authenticated username for My Albums//
  const [username, setUsername] = useState("");

  /////Get username to display for My Albums/////
  useEffect(() => {
    const getUsername = async () => {
      const response = await fetch(`/dj-rest-auth/user/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setUsername(data.username);
    };
    getUsername();
  }, []);

  /////Fetch authenticated user's albums/////
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

  if (!myAlbums) {
    return null;
  }

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
    <Col id="card-column" key={album.album_detail.api_id}>
      <Card className="my-albums-card h-100" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={album.album_detail.cover_image} />
        <Card.Body>
          <Card.Title id="my-albums-card-title">
            {album.album_detail.title}
          </Card.Title>
          <div id="album-detail-buttons">
            <Link
              id="album-detail"
              to={`/my-album-detail/${album.id}`}
              type="primary"
            >
              View Album
            </Link>
            <Button type="submit" onClick={() => deleteAlbum(album.id)}>
              <FaTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div className="my-albums-container">
      {" "}
      <h1 className="my-albums-header">{username}'s Albums</h1>
      <Container id="my-album-list">
        <Row>{MyAlbumListHTML}</Row>
      </Container>
    </div>
  );
}

export default MyAlbums;
