import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Cookies from "js-cookie";

function AlbumSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [albums, setAlbums] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(`/api_v1/search/${query}/`);
    const data = await response.json();
    setResults(data.results);
  };

  const handleAddAlbum = async (album) => {
    const album_detail = {
      artist: album.artist,
      cover_image: album.cover_image,
      title: album.title,
      year: album.year,
      tracks: album.tracks,
      genre: album.genre,
      api_id: album.api_id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ album_detail }),
    };
    const response = await fetch("/api_v1/user/albums/", options);
    if (!response.ok) {
      throw new Error("Network response not ok");
    } else alert("Album added!");

    const data = await response.json();
    console.log({ data });
  };

  return (
    <div>
      <Container id="search-container">
        <Form id="search">
          <Form.Group className="mb-3" controlId="formBasicSearch">
            <Form.Control
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artists and albums"
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </Container>

      <Row>
        {results.map((result) => (
          <Container className="col-md-3">
            <div className="d-flex flex-column">
              <Card style={{ width: "12rem" }} key={result.title}>
                <Card.Img
                  variant="left"
                  src={result.cover_image}
                  alt="album cover"
                />

                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Genre: {result.genre}</ListGroup.Item>
                    <ListGroup.Item>Year: {result.year}</ListGroup.Item>
                    {result.formats.map((format) => (
                      <ListGroup.Item key={format}>
                        Format: {format}
                      </ListGroup.Item>
                    ))}

                    {/* <ListGroup.Item>Tracklist</ListGroup.Item>
                  {result.tracks.map((track) => (
                    <ListGroup.Item key={track}>{track}</ListGroup.Item>
                  ))} */}
                  </ListGroup>
                  <Button
                    variant="primary"
                    onClick={() => handleAddAlbum(result)}
                  >
                    Add to Albums
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        ))}
        ;
      </Row>
    </div>
  );
}

export default AlbumSearch;
