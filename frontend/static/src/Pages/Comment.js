import { useState, useEffect } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";

function Comment({ comment, ...props }) {
  const updatedAt = new Date(comment.updated_at);
  const formattedDate = updatedAt.toLocaleString();
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const updateComment = () => {
    props.handleSubmitComment(comment.id, text);
    setEditing(false);
  };

  return (
    <div className="friend-comment">
      <Container>
        <Card key={comment.id} style={{ width: "50rem" }}>
          <Card.Body>
            <Card.Title>{comment.author_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {formattedDate}
            </Card.Subtitle>
            <Image
              src={comment.user_profile}
              className="rounded-circle member-photo"
            />
            <Form>
              <Form.Control
                name="comment"
                as="textarea"
                value={text}
                style={{ height: "100px" }}
                onChange={(e) => setText(e.target.value)}
                disabled={!isEditing}
                className={`${!isEditing && "input-preview"}`}
              />
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Container className="comment-btn-container">
        {comment.is_author && !isEditing && (
          <Button type="button" onClick={() => setEditing(true)}>
            Edit Comment
          </Button>
        )}

        {comment.is_author && isEditing && (
          <Button type="button" onClick={updateComment}>
            Save Comment
          </Button>
        )}

        {comment.is_author && (
          <Button type="button" onClick={() => props.deleteComment(comment.id)}>
            Delete Comment
          </Button>
        )}
      </Container>
    </div>
  );
}

export default Comment;
