import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function FriendAlbums() {
  const [friendAlbums, setFriendAlbums] = useState(null);
  let { friendId } = useParams();
  //get username for friend albums header
  const [username, setUsername] = useState();

  useEffect(() => {
    const getFriendAlbums = async (id) => {
      const response = await fetch(`/api_v1/friend/${id}/albums/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setUsername(data[0].username);
      setFriendAlbums(data);
    };

    getFriendAlbums(friendId);
  }, []);

  if (!friendAlbums) {
    return null;
  }

  const FriendAlbumListHTML = friendAlbums.map((album) => (
    <Col id="card-column" key={album.album_detail.api_id}>
      <Card className="h-100" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={album.album_detail.cover_image} />
        <Card.Body id="friend-card-body">
          <Card.Title id="friend-album-title">
            {album.album_detail.title}
          </Card.Title>
          <Link
            id="friend-detail-btn"
            to={`/friend-album-detail/${album.id}`}
            type="primary"
          >
            View Album
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div id="friend-album-main">
      {" "}
      <h1 className="friend-album-page-header">{username}'s Albums</h1>
      <Container className="friend-album-container">
        <Row>{FriendAlbumListHTML}</Row>
      </Container>
    </div>
  );
}

export default FriendAlbums;
