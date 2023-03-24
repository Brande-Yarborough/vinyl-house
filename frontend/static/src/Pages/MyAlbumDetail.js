import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Container, ListGroup, Image, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Comment from "./Comment";

function MyAlbumDetail() {
  const [albumDetails, setAlbumDetails] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();
  const [isEditingNote, setIsEditingNote] = useState(false);
  //for delete comment//
  //   const [comments, setComments] = useState([]);
  ///for handle new comment///
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

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
      setImage(data?.user_image);
    };
    getAlbumDetails();
  }, []);

  /////Add Comment/////
  const addComment = async (event) => {
    event.preventDefault();
    const newComment = {
      text: comment,
      album: albumDetails.id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newComment),
    };

    const response = await fetch(`/api_v1/comments/`, options);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }

    const data = await response.json();
    // console.log({ data });
    const comments = [...albumDetails.comments, data];
    setAlbumDetails({ ...albumDetails, comments });
    // setComments([...comments, data]);
    //clears new comment form back out
    setComment("");
  };

  const handleNewComment = (event) => {
    setComment(event.target.value);
  };

  /////Delete Comment/////
  const deleteComment = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch(`/api_v1/comments/${id}/`, options);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      //create shallow copy of comments
      let updatedComments = [...albumDetails.comments];
      //find index of comment we want to delete
      const index = updatedComments.findIndex((x) => x.id == id);
      //removing comment from array
      updatedComments.splice(index, 1);
      //reset state with updatedComments
      setAlbumDetails({ ...albumDetails, comments: updatedComments });
    }
  };

  /////Handle Submit for Comment Edit/////
  const handleSubmitComment = async (id, text) => {
    // const formData = new FormData();
    // formData.append("comment", albumDetails?.comment);

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    };

    const response = await fetch(`/api_v1/comments/${id}/`, options);

    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    // const data = await response.json();
    const updatedComments = [...albumDetails.comments];
    const index = updatedComments.findIndex((comment) => comment.id === id);
    updatedComments[index].text = text;
    setAlbumDetails({ ...albumDetails, comments: updatedComments });
  };

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
  const handleImage = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("user_image", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

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
    console.log(data);
    ///need to updated these 2 lines to update state without having to refresh page to show image
    setImage(data?.user_image);
    console.log(response);
    // const user_image = { ...albumDetails, user_image: user_image };

    setAlbumDetails({ ...albumDetails, user_image: file });
  };
  let myAlbumDetailHTML; //instantiating instance of new variable myAlbumHTML
  //////////This will show the edit album note option form//////////
  if (isEditingNote) {
    myAlbumDetailHTML = (
      <div id="background-image">
        <Container className="edit-note-container">
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
      </div>
    );

    //////////This will show the list of my albums//////////
  } else {
    myAlbumDetailHTML = (
      <div className="my-album-detail-page">
        <div className="album-detail-main row">
          <Container className="album-detail-container d-flex container col-12 col-md">
            <div className="card-image">
              <Card.Img
                variant="top"
                src={albumDetails?.album_detail?.cover_image}
              />
            </div>
            <Card
              style={{ width: "30rem" }}
              key={albumDetails?.album_detail?.api_id}
              className="album-detail-card"
            >
              <Card.Body className="album-detail-card-body">
                <div>
                  <Card.Title>{albumDetails?.album_detail?.title}</Card.Title>
                  <div className="genre-year">
                    <ListGroup.Item id="genre">
                      Genre: {albumDetails?.album_detail?.genre}
                    </ListGroup.Item>
                    <ListGroup.Item id="album-year">
                      Year: {albumDetails?.album_detail?.year}
                    </ListGroup.Item>
                  </div>
                </div>
                <div>
                  <ListGroup.Item id="tracklist">Tracklist :</ListGroup.Item>
                  <ListGroup variant="flush">
                    {albumDetails?.album_detail?.tracks.map((track) => (
                      <ListGroup.Item key={track}>{track}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Card.Body>
            </Card>
          </Container>
          <div className="user-note-image col-12 col-md">
            <Container className="personal-note">
              <Card.Title>Personal Note</Card.Title>
              <Card className="personal-note-card">
                <Card.Body>{albumDetails?.note}</Card.Body>
              </Card>
              {/* only show if user logged in is owner of note */}
              <Button type="button" onClick={() => setIsEditingNote(true)}>
                Edit Note
              </Button>
            </Container>
            <Container className="user-image">
              {/* {albumDetails?.user_image !== null ? ( */}
              <>
                <Card.Title>Photo Memory</Card.Title>
                <Card.Img
                  variant="left"
                  src={image}
                  // alt="user submitted image"
                  style={{ width: "40%", display: "block" }}
                />
              </>
              {/* ) : ( */}
              <div>
                <input type="file" onChange={handleImage}></input>
              </div>
              {/* )} */}
            </Container>
            <Container className="comment-container">
              <Card.Title>Add Comment</Card.Title>
              <Form className="comment-form" onSubmit={addComment}>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Add Comments"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Comments"
                    style={{ height: "100px" }}
                    value={comment}
                    onChange={handleNewComment}
                  />
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="primary"
                  className="comment-sub-btn"
                >
                  Submit
                </Button>
              </Form>
            </Container>
            <div className="friend-comment-container">
              {albumDetails?.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  deleteComment={deleteComment}
                  handleSubmitComment={handleSubmitComment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  console.log({ image });

  return (
    <>
      <Link className="detail-back" to="/">
        Back to My Albums
      </Link>
      <div>{myAlbumDetailHTML}</div>
    </>
  );
}

export default MyAlbumDetail;
