import { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";

function Comment({ comment, ...props }) {
  const updatedAt = new Date(comment.updated_at);
  const formattedDate = updatedAt.toLocaleString();

  return (
    <div>
      <Container>
        <Card key={comment.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{comment.author_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {formattedDate}
            </Card.Subtitle>
            <Card.Text>{comment.text}</Card.Text>
            <Card.Link href="#">Reply</Card.Link>
          </Card.Body>
        </Card>
      </Container>

      {comment.is_author ? (
        <Button type="button" onClick={() => props.deleteComment(comment.id)}>
          delete comment
        </Button>
      ) : null}
      {comment.is_author ? <Button type="button">edit comment</Button> : null}
    </div>
  );
}

export default Comment;
