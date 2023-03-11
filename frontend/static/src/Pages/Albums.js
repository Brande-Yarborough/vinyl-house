import "../App.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Albums() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const getAlbums = async () => {
      const response = await fetch("/api_v1/albums/");

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log({ data });
      console.log("hello its me");
      setAlbums([data]);
    };

    getAlbums();
  }, []);

  if (!albums) {
    return <div>Fetching data ...</div>;
  }

  const albumsHTML = albums.map((album) => (
    <Card style={{ width: "18rem" }} key={album.id}>
      <Card.Img variant="top" src={album.cover_image} />
      <Card.Body>
        <Card.Title>
          {album.artist}-{album.title}
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Genre: {album.genre}</ListGroup.Item>
          <ListGroup.Item>Year: {album.year}</ListGroup.Item>
          <ListGroup.Item>Tracklist</ListGroup.Item>
          {album.tracks.map((track) => (
            <ListGroup.Item>{track.title}</ListGroup.Item>
          ))}
        </ListGroup>
        <Button variant="primary">Add to Collection</Button>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      {albumsHTML}
      <div className="App">
        <button onClick={fetch}>I am button</button>
      </div>
    </>
  );
}

export default Albums;
