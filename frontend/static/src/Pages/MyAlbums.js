import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

function MyAlbums() {
  const [myAlbums, setMyAlbums] = useState([]);

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
    <Card style={{ width: "18rem" }} key={album.id}>
      <Card.Img variant="top" src={album.image} />
      <Card.Body>
        <Card.Title>
          {album.album}-{album.note}
        </Card.Title>
        <Button variant="primary">Album Detail</Button>
      </Card.Body>
    </Card>
  ));

  return <div>{MyAlbumListHTML}</div>;
}

export default MyAlbums;
