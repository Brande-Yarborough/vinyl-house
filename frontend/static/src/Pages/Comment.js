import { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

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
    <div>
      <Container>
        <Card key={comment.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{comment.author_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {formattedDate}
            </Card.Subtitle>
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

            {/* Reply is a  Dream, not a need */}
            {/* <Card.Link href="#">Reply</Card.Link> */}
          </Card.Body>
        </Card>
      </Container>

      <Container>
        {comment.is_author && !isEditing && (
          <Button type="button" onClick={() => setEditing(true)}>
            edit comment
          </Button>
        )}

        {comment.is_author && isEditing && (
          <Button type="button" onClick={updateComment}>
            save comment
          </Button>
        )}

        {comment.is_author && (
          <Button type="button" onClick={() => props.deleteComment(comment.id)}>
            delete comment
          </Button>
        )}
      </Container>
    </div>
  );
}

export default Comment;
