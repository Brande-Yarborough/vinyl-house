import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Collection() {
  const [collection, setCollection] = useState([]);
  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    fetch(`/collection/${username}/`)
      .then((response) => response.json())
      .then((data) => {
        setCollection(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [username]);

  return (
    <div>
      <h1>{username}'s Collection</h1>
      <ul>
        {collection.map((release) => (
          <li key={release.title}>
            <strong>{release.title}</strong> ({release.year}) by{" "}
            {release.artists.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Collection;
