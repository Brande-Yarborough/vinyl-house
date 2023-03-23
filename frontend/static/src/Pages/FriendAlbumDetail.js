import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Container, ListGroup, Image, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Comment from "./Comment.js";

function FriendAlbumDetail() {
  let { albumId } = useParams();
  const navigate = useNavigate();

  const [albumDetails, setAlbumDetails] = useState([{}]);
  const [comment, setComment] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  //for delete comment//
  //   const [comments, setComments] = useState([]);
  ///for handle new comment///

  useEffect(() => {
    // read the params of the album id
    const getAlbumDetails = async (albumId) => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      const response = await fetch(
        `/api_v1/friend/${albumId}/albumdetail/`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      setAlbumDetails(data);
      console.log({ data });
    };
    getAlbumDetails(albumId);
  }, []);

  /////Add Comment/////
  const addComment = async (event) => {
    event.preventDefault();
    const newComment = {
      text: comment,
      album: albumDetails?.[0].id,
    };
    console.log(albumDetails?.[0].id);

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
    const comments = [...albumDetails?.[0].comments, data];
    setAlbumDetails([{ ...albumDetails?.[0], comments }]);
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
      console.log(response);
      //create shallow copy of comments
      let comments = [...albumDetails?.[0].comments];
      //find index of comment we want to delete
      const index = comments.findIndex((x) => x.id == id);
      //removing comment from array
      comments.splice(index, 1);
      console.log(albumDetails);
      //reset state with comments
      setAlbumDetails([{ ...albumDetails[0], comments }]);
      console.log(albumDetails);
    }
  };

  /////Handle Submit for Comment Edit/////
  const handleSubmitComment = async (id, text) => {
    // alert("hey");
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

    const response = await fetch(
      `/api_v1/friend/${albumId}/albumdetail/`,
      options
    );
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

  console.log(albumDetails?.[0]);

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

    //////////This will show the album detail//////////
  } else {
    myAlbumDetailHTML = (
      <div className="my-album-detail-page">
        <div className="album-detail-main">
          <Container className="album-detail-container d-flex">
            <div className="card-image">
              <Card.Img
                variant="top"
                src={albumDetails?.[0].album_detail?.cover_image}
              />
            </div>
            <Card
              style={{ width: "18rem" }}
              key={albumDetails?.[0].album_detail?.api_id}
              className="album-detail-card"
            >
              <Card.Body className="album-detail-card-body">
                <div>
                  <Card.Title>
                    {albumDetails?.[0].album_detail?.title}
                  </Card.Title>
                  <div className="genre-year">
                    <ListGroup.Item id="genre">
                      Genre: {albumDetails?.[0].album_detail?.genre}
                    </ListGroup.Item>
                    <ListGroup.Item id="album-year">
                      Year: {albumDetails?.[0].album_detail?.year}
                    </ListGroup.Item>
                  </div>
                </div>
                <div>
                  <ListGroup.Item id="tracklist">Tracklist :</ListGroup.Item>
                  <ListGroup variant="flush">
                    {albumDetails?.[0].album_detail?.tracks.map((track) => (
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
              <Card>
                <Card.Body>{albumDetails?.[0].note}</Card.Body>
              </Card>
              {/* only show if user logged in is owner of note */}
              {/* <Button type="button" onClick={() => setIsEditingNote(true)}>
            Edit Note
          </Button> */}
            </Container>

            <Container className="user-image">
              {/* {albumDetails?.[0].user_image !== null ? ( */}
              <>
                <Card.Title>Image Memory</Card.Title>
                <Card.Img
                  variant="left"
                  src={albumDetails?.[0].user_image}
                  //   alt="user submitted image"
                  style={{ width: "40%", display: "block" }}
                />
              </>
              {/* ) : (
            <div>
              <div>Add Image: </div>
              <input type="file"></input>
            </div>
          )} */}
            </Container>

            <Container className="comment-container">
              <Card.Title>Add Comment</Card.Title>
              <Form onSubmit={addComment}>
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
              {albumDetails?.[0].comments?.map((comment) => (
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
  return (
    <>
      {/* <Link to={`/friend-albums/:friendId`}>Back to Friends Albums</Link> */}
      <div>{myAlbumDetailHTML}</div>
    </>
  );
}

export default FriendAlbumDetail;
