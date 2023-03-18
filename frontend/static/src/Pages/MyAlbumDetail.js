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
    alert("hey");
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
                src={image}
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
              <input type="file" onChange={handleImage}></input>
            </div>
          )}
        </Container>

        <Container>
          <Form onSubmit={addComment}>
            <FloatingLabel controlId="floatingTextarea2" label="Add Comments">
              <Form.Control
                as="textarea"
                placeholder="Comments"
                style={{ height: "100px" }}
                value={comment}
                onChange={handleNewComment}
              />
            </FloatingLabel>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
  console.log({ image });

  return (
    <>
      <Link to="/">Back to My Albums</Link>
      <div>{myAlbumDetailHTML}</div>
      <div>
        {albumDetails?.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            handleSubmitComment={handleSubmitComment}
          />
        ))}
      </div>
    </>
  );
}

export default MyAlbumDetail;
