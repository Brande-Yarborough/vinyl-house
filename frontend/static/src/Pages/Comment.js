import { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";

function Comment({ comment, ...props }) {
  return (
    <div>
      {/* <div>{comment.text}</div> */}

      <Container>
        <Card key={comment.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{comment.author_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {comment.updated_at}
            </Card.Subtitle>
            <Card.Text>{comment.text}</Card.Text>
            <Card.Link href="#">Reply</Card.Link>
          </Card.Body>
        </Card>
      </Container>

      {comment.is_author ? (
        <Button value={() => props.deleteComment(comment.id)}>
          delete comment
        </Button>
      ) : null}
      {comment.is_author ? <button>edit comment</button> : null}
    </div>
  );
}

export default Comment;
