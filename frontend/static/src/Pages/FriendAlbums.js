import { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
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
    <Container className="d-flex" key={album.album_detail.api_id}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={album.album_detail.cover_image} />
        <Card.Body>
          <Card.Title>{album.album_detail.title}</Card.Title>
          <Link to={`/friend-album-detail/${album.id}`} type="primary">
            Album Detail
          </Link>
        </Card.Body>
      </Card>
    </Container>
  ));

  return (
    <div>
      {" "}
      <h1>Friends Albums</h1>
      {FriendAlbumListHTML}
    </div>
  );
}

export default FriendAlbums;

// function add(num1, num2) {
//     return num1 + num2;
// }

// add()
