import "../App.css";
import { useState } from "react";
import Cookies from "js-cookie";

function Albums() {
  const [albums, setAlbums] = useState(null);

  //fetch request
  const fetch = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(albums),
    };

    const response = await fetch("/api_v1/albums/", options);
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    console.log({ data });
    console.log("hello its me");
    setAlbums([...albums, data]);
  };

  if (!albums) {
    return <div>Fetching data ...</div>;
  }

  return (
    <div className="App">
      <button onclick={fetch}>I am button</button>
    </div>
  );
}

export default Albums;
