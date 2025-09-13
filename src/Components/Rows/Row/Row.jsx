import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const BASE_URL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title = "Movies", fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(fetchUrl);
        setMovies(data?.results || []);
      } catch (error) {
        console.error("Error fetching row data:", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  
  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); 
      return;
    }

    try {
      const url = await movieTrailer(
        movie?.title || movie?.name || movie?.original_name || ""
      );
      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
    
      <h2 className="row__title">{title}</h2>

 
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.name || movie?.title}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
          />
        ))}
      </div>

 
      {trailerUrl && (
        <div className="row__trailer">
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Row;
