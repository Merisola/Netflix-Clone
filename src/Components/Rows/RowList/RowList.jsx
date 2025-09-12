// RowList.jsx
import React from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";

const RowList = () => {
  // Helper to format keys into readable titles
  const formatTitle = (key) => {
    switch (key) {
      case "fetchNetflixOriginals":
        return "Netflix Originals";
      case "fetchTrending":
        return "Trending";
      case "fetchTopRated":
        return "Top Rated";
      case "fetchActionMovies":
        return "Action Movies";
      case "fetchComedyMovies":
        return "Comedy Movies";
      case "fetchHorrorMovies":
        return "Horror Movies";
      case "fetchRomanceMovies":
        return "Romance Movies";
      case "fetchDocumentaries":
        return "Documentaries";
      case "fetchPopularTV":
        return "Popular TV Shows";
      default:
        return "Movies";
    }
  };

  return (
    <div>
      {Object.entries(requests).map(([key, url]) => (
        <Row
          key={key}
          title={formatTitle(key)}
          fetchUrl={url}
          isLargeRow={key === "fetchNetflixOriginals"} 
        />
      ))}
    </div>
  );
};

export default RowList;
