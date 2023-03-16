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
  const [isEditingNote, setIsEditingNote] = useState(false);

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

  /////handle Change event for Note/////
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAlbumDetails({ ...albumDetails, [name]: value });
  };
  /////handle Submit for Note/////
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("note", albumDetails?.note);

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api_v1/user/albums/${id}/`, options);
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    setIsEditingNote(false);
  };

  /////handle Image for user uploaded image/////
  const handleImage = (event) => {
    const file = event.target.files[0];
    setAlbumDetails({ ...albumDetails, image: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  let myAlbumDetailHTML; //instantiating instance of new variable myAlbumHTML
  //////////This will show the edit album note option form//////////
  if (isEditingNote) {
    myAlbumDetailHTML = (
      //  This form/text area will only show up if user wants to add or edit note */}
      <Container>
        <Form>
          <FloatingLabel controlId="floatingTextarea2" label="Note">
            <Form.Control
              name="note"
              as="textarea"
              value={albumDetails?.note}
              placeholder="Put a note here for a personal memory related to album"
              style={{ height: "100px" }}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Button
            id="note"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Note
          </Button>
        </Form>
      </Container>
    );
    //////////This will show the list of my albums//////////
  } else {
    myAlbumDetailHTML = (
      <>
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

                <ListGroup.Item>Tracklist</ListGroup.Item>
                {albumDetails?.album_detail?.tracks.map((track) => (
                  <ListGroup.Item key={track}>{track}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
        <Container>
          <Card>
            <Card.Title>User Personal Note:</Card.Title>
            <Card.Body>{albumDetails?.note}</Card.Body>
          </Card>
          {/* only show if user logged in is owner of note */}
          <Button type="button" onClick={() => setIsEditingNote(true)}>
            Edit Note
          </Button>
        </Container>

        <Container>
          {albumDetails?.user_image !== null ? (
            <>
              <Card.Title>User Image:</Card.Title>
              <Card.Img
                variant="left"
                src={albumDetails?.user_image}
                alt="user submitted image"
                style={{ width: "35%", display: "block" }}
              />

              {/* <div className="d-flex">
                <div>Add Image: </div>
                <input type="file"></input>
              </div> */}
            </>
          ) : (
            <div>
              <div>Add Image: </div>
              <input type="file"></input>
            </div>
          )}
        </Container>

        <Container>
          <FloatingLabel controlId="floatingTextarea2" label="Add Comments">
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
  return (
    <>
      <Link to="/my-albums">Back to My Albums</Link>
      <div>{myAlbumDetailHTML}</div>
    </>
  );
}

export default MyAlbumDetail;
