import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Container, ListGroup, Image, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function MyAlbumDetail() {
  const [albumDetails, setAlbumDetails] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAlbumDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      const response = await fetch(`/api_v1/user/albums/${id}/`, options);
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      setAlbumDetails(data);
      console.log({ data });
    };
    getAlbumDetails();
  }, []);

  //   const deleteAlbum = async (event) => {
  //     const id = event.currentTarget.value;
  //     const options = {
  //       method: "DELETE",
  //       headers: {
  //         "X-CSRFToken": Cookies.get("csrftoken"),
  //       },
  //     };
  //     const response = await fetch(`/api_v1/user/albums/${id}/`, options);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     } else {
  //       console.log(response);
  //       //create shallow copy of albums
  //       let updatedAlbums = [...albums];
  //       //find index of album we want to delete
  //       const index = updatedAlbums.findIndex((x) => x.id == id);
  //       //removing album from array
  //       updatedAlbums.splice(index, 1);
  //       //reset state with updatedAlbums
  //       setAlbumDetails(updatedAlbums);
  //       console.log(albums);
  //     }
  //   };

  return (
    <>
      <Link to="/my-albums">Back to My Albums</Link>

      <Container className="d-flex">
        <Card
          style={{ width: "18rem" }}
          key={albumDetails?.album_detail?.api_id}
        >
          <Card.Img
            variant="top"
            src={albumDetails?.album_detail?.cover_image}
          />
          <Card.Body>
            <Card.Title>{albumDetails?.album_detail?.title}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Genre: {albumDetails?.album_detail?.genre}
              </ListGroup.Item>
              <ListGroup.Item>
                Year: {albumDetails?.album_detail?.year}
              </ListGroup.Item>

              {/* <div>
                <Button type="submit" onClick={deleteAlbum}>
                  Delete Album
                </Button>
              </div> */}

              <ListGroup.Item>Tracklist</ListGroup.Item>
              {albumDetails?.album_detail?.tracks.map((track) => (
                <ListGroup.Item key={track}>{track}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
      {/* This form/text area will only show up if user wants to add or edit note: also need options to delete note */}
      <Container>
        <FloatingLabel controlId="floatingTextarea2" label="Note">
          <Form.Control
            //   {albumDetails?.album_detail?.note}
            as="textarea"
            placeholder="Put a note here for a personal memory related to album"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <Button>Edit Note</Button>
        <Button>Submit Note</Button>
        <div>
          <Image
            src={albumDetails?.album_detail?.user_image}
            alt="user submitted image"
          />
          <Button>Edit Image</Button>
        </div>
      </Container>

      <Container>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
          <Form.Control
            as="textarea"
            placeholder="Comments"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <Button>Submit</Button>
      </Container>

      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Username</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Created March 14, 2023
            </Card.Subtitle>
            <Card.Text>I saw him in Charleston! Love this album!</Card.Text>
            <Card.Link href="#">Reply</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default MyAlbumDetail;
