import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

function AlbumSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api_v1/search/${query}/`);
    const data = await response.json();
    setResults(data.results);
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
      {/* <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button> */}
      {results.map((result) => (
        <Container>
          <div className="d-flex flex-column">
            <Card style={{ width: "18rem" }} key={result.title}>
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

                  <ListGroup.Item>Tracklist</ListGroup.Item>
                  {result.tracks.map((track) => (
                    <ListGroup.Item key={track}>{track}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Button variant="primary">Add to Collection</Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      ))}
      ;
      {/* <ul>
         {results.map((result) => ( 
           <li key={result.title}>
             <img src={result.cover_image} alt="album cover"></img>
             <h3>{result.title}</h3>
             <p>{result.artist}</p>
             <p>{result.year}</p>
             <p>{result.genre}</p>
             <ul>
               {result.tracks.map((track) => (
                 <li key={track}>{track}</li>
               ))}
             </ul>
           </li>
         ))}
       </ul> */}
    </div>
  );
}

export default AlbumSearch;
