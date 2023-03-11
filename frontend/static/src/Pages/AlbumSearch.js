import React, { useState } from "react";

function AlbumSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api_v1/search/${query}/`);
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.title}>
            <h3>{result.title}</h3>
            <p>{result.artist}</p>
            <ul>
              {result.tracks.map((track) => (
                <li key={track}>{track}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumSearch;
