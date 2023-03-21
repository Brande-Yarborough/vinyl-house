import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Cookies from "js-cookie";

function AlbumSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`/api_v1/search/${query}/`);
    const data = await response.json();
    setResults(data.results);
    setLoading(false);
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
    navigate("/");
  };

  return (
    <div id="search-background-image">
      <div className="search-header">
        <h3 className="search-title">Browse the collection...</h3>
        <Container id="search-container">
          <Form id="search">
            <Form.Group controlId="formBasicSearch">
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
      </div>
      {!loading ? (
        <Row id="search-results">
          {results.map((result) => (
            <Container className="col-md-3">
              <div className="d-flex flex-column">
                <Card style={{ width: "15rem" }} key={result.title}>
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
        </Row>
      ) : (
        <div className="loading-spinner">
          <Spinner animation="border" variant="warning"></Spinner>
        </div>
      )}
    </div>
  );
}

export default AlbumSearch;
