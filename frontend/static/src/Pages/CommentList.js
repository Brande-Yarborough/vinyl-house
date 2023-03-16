import { useState, useEffect } from "react";

function CommentList({ selectedAlbum }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`/api_v1/comments/?album=${selectedAlbum}`);

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Comments
      setComments(data);
      console.log(data);
    };
    //call getMessages
    getComments();
    console.log(`/api_v1/comments/?album=${selectedAlbum}`);
  }, [selectedAlbum]);

  const commentsHTML = comments.map((comment) => (
    <div key={comment.id}>
      <div>{comment.text}</div>
      {comment.is_author ? (
        <button value={comment.id}>delete comment</button>
      ) : null}
      {comment.is_author ? <button>edit comment</button> : null}
    </div>
  ));

  return <>{commentsHTML}</>;
}

export default CommentList;
