import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Container } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  const MyAlbumListHTML = myAlbums.map((album) => (
    <Container className="d-flex">
      <Card style={{ width: "18rem" }} key={album.album_detail.api_id}>
        <Card.Img variant="top" src={album.album_detail.cover_image} />
        <Card.Body>
          <Card.Title>{album.album_detail.title}</Card.Title>
          <Link to={`/my-album-detail/${album.id}`} type="primary">
            Album Detail
          </Link>
        </Card.Body>
      </Card>
    </Container>
  ));

  return (
    <div>
      {" "}
      <h1>Brande's Albums</h1>
      {MyAlbumListHTML}
    </div>
  );
}

export default MyAlbums;
