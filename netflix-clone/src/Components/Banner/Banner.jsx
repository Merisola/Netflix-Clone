import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchData();
  }, []);

  const backgroundImage = movie?.backdrop_path
    ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
    : "none"; // handled in CSS with gradient overlay

  const getTitle = () =>
    movie?.title || movie?.name || movie?.original_name || "Untitled";

  const truncate = (text, maxLength) =>
    text?.length > maxLength ? text.substring(0, maxLength - 1) + "…" : text;

  // Handle play button click
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // close trailer if already open
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  };

  // YouTube options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{getTitle()}</h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      {/* Gradient overlay */}
      <div className="banner--fadeBottom"></div>

      {/* Show trailer if available */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </header>
  );
};

export default Banner;
