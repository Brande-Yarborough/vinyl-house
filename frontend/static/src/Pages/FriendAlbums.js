import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function FriendAlbums() {
  const [friendAlbums, setFriendAlbums] = useState([]);
  const navigate = useNavigate();
  let { friendId } = useParams();

  useEffect(() => {
    const getFriendAlbums = async (id) => {
      const response = await fetch(`/api_v1/friend/${id}/albums/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setFriendAlbums(data);
    };

    getFriendAlbums(friendId);
  }, []);

  const FriendAlbumListHTML = friendAlbums.map((album) => (
    <Col md={3} key={album.album_detail.api_id}>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="top" src={album.album_detail.cover_image} />
        <Card.Body>
          <Card.Title>{album.album_detail.title}</Card.Title>
          <Link to={`/friend-album-detail/${album.id}`} type="primary">
            Album Detail
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
      {" "}
      <h1>Friends Albums</h1>
      <Container>
        <Row>{FriendAlbumListHTML}</Row>
      </Container>
    </div>
  );
}

export default FriendAlbums;
